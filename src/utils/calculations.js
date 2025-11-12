// Constants
const CACHE_SIZE_LIMIT = 100; // Limit cache size to prevent memory leaks
const CACHE_TTL = 1000 * 60 * 60; // Cache entries expire after 1 hour

// LRU Cache implementation with TTL
class LRUCache {
  constructor(limit) {
    this.limit = limit;
    this.cache = new Map();
    this.ttlMap = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return undefined;

    const now = Date.now();
    const ttl = this.ttlMap.get(key);

    if (now > ttl) {
      this.cache.delete(key);
      this.ttlMap.delete(key);
      return undefined;
    }

    const value = this.cache.get(key);
    // Refresh item
    this.cache.delete(key);
    this.cache.set(key, value);
    this.ttlMap.set(key, now + CACHE_TTL);
    return value;
  }

  set(key, value) {
    if (this.cache.size >= this.limit) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
      this.ttlMap.delete(firstKey);
    }

    this.cache.set(key, value);
    this.ttlMap.set(key, Date.now() + CACHE_TTL);
  }
}

// Initialize caches
const emiCache = new LRUCache(CACHE_SIZE_LIMIT);
const amortizationCache = new LRUCache(CACHE_SIZE_LIMIT);

// Initialize Web Worker
let calculationWorker;
try {
  calculationWorker = new Worker(
    new URL("./calculationWorker.js", import.meta.url)
  );
} catch (e) {
  console.warn(
    "Web Worker not supported, falling back to synchronous calculations"
  );
}

// Promise-based worker communication
const workerCalculate = (type, data) => {
  return new Promise((resolve, reject) => {
    if (!calculationWorker) {
      reject(new Error("Worker not available"));
      return;
    }

    const handler = (e) => {
      if (e.data.type === type) {
        calculationWorker.removeEventListener("message", handler);
        resolve(e.data.result);
      }
    };

    calculationWorker.addEventListener("message", handler);
    calculationWorker.postMessage({ type, data });
  });
};

export const calculateEmi = async (principal, interestRate, loanTerm) => {
  // Round inputs to prevent floating-point precision issues in cache keys
  principal = Math.round(principal);
  interestRate = Number(interestRate.toFixed(2));
  loanTerm = Math.round(loanTerm);

  // Handle zero interest rate case
  if (interestRate === 0) {
    const totalMonths = loanTerm * 12;
    const emi = principal / totalMonths;
    return Math.round(emi * 100) / 100; // Round to 2 decimal places
  }

  const cacheKey = `${principal}-${interestRate}-${loanTerm}`;
  const cachedResult = emiCache.get(cacheKey);
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  try {
    const emi = await workerCalculate("emi", {
      principal,
      interestRate,
      loanTerm,
    });
    emiCache.set(cacheKey, emi);
    return emi;
  } catch (e) {
    // Fallback to synchronous calculation if worker fails
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const factor = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const emi = (principal * monthlyInterestRate * factor) / (factor - 1);
    emiCache.set(cacheKey, emi);
    return emi;
  }
};

export const calculateAmortization = async (
  principal,
  interestRate,
  loanTerm,
  emiValue
) => {
  // Round inputs for consistent cache keys
  principal = Math.round(principal);
  interestRate = Number(interestRate.toFixed(2));
  loanTerm = Math.round(loanTerm);
  emiValue = Math.round(emiValue * 100) / 100;

  // Handle zero interest rate case
  if (interestRate === 0) {
    const totalMonths = loanTerm * 12;
    const monthlyPrincipal = principal / totalMonths;

    // Create monthly amortization schedule
    const monthlyAmortization = new Array(totalMonths);
    const yearlyAmortization = new Array(loanTerm);
    let remainingPrincipal = principal;

    // Calculate monthly schedule
    for (let i = 0; i < totalMonths; i++) {
      monthlyAmortization[i] = {
        openingBalance: remainingPrincipal,
        principalPaid: monthlyPrincipal,
        interestPaid: 0,
        closingBalance: remainingPrincipal - monthlyPrincipal,
      };
      remainingPrincipal -= monthlyPrincipal;
    }

    // Calculate yearly schedule
    for (let year = 0; year < loanTerm; year++) {
      const yearStartIndex = year * 12;
      const yearlyPrincipal = monthlyPrincipal * 12;
      yearlyAmortization[year] = {
        openingBalance: monthlyAmortization[yearStartIndex].openingBalance,
        principalPaid: yearlyPrincipal,
        interestPaid: 0,
        closingBalance:
          year === loanTerm - 1
            ? 0
            : monthlyAmortization[yearStartIndex + 11].closingBalance,
      };
    }

    return [monthlyAmortization, yearlyAmortization];
  }

  const cacheKey = `${principal}-${interestRate}-${loanTerm}-${emiValue}`;
  const cachedResult = amortizationCache.get(cacheKey);
  if (cachedResult !== undefined) {
    return cachedResult;
  }

  try {
    const result = await workerCalculate("amortization", {
      principal,
      interestRate,
      loanTerm,
      emiValue,
    });
    amortizationCache.set(cacheKey, result);
    return result;
  } catch (e) {
    // Fallback to optimized synchronous calculation
    const monthlyInterestRate = interestRate / (100 * 12);
    const totalMonths = loanTerm * 12;

    // Pre-allocate arrays with correct size for better memory efficiency
    const monthlyAmortization = new Array(totalMonths);
    const yearlyAmortization = new Array(loanTerm);

    // Use TypedArrays for better performance with floating-point calculations
    const yearlyPrincipal = new Float64Array(loanTerm);
    const yearlyInterest = new Float64Array(loanTerm);

    let currentPrincipal = principal;

    // Process data in chunks for better performance
    const CHUNK_SIZE = 12; // Process one year at a time
    for (let i = 0; i < totalMonths; i += CHUNK_SIZE) {
      const yearIndex = i / CHUNK_SIZE;
      const yearStartBalance = currentPrincipal;

      // Process one year's worth of months
      for (let j = 0; j < CHUNK_SIZE && i + j < totalMonths; j++) {
        const monthlyInterest = currentPrincipal * monthlyInterestRate;
        const principalPaid = emiValue - monthlyInterest;

        yearlyPrincipal[yearIndex] += principalPaid;
        yearlyInterest[yearIndex] += monthlyInterest;

        monthlyAmortization[i + j] = {
          openingBalance: currentPrincipal,
          principalPaid,
          interestPaid: monthlyInterest,
          closingBalance: currentPrincipal - principalPaid,
        };

        currentPrincipal -= principalPaid;
      }

      // Create yearly summary
      yearlyAmortization[yearIndex] = {
        openingBalance: yearStartBalance,
        principalPaid: yearlyPrincipal[yearIndex],
        interestPaid: yearlyInterest[yearIndex],
        closingBalance: currentPrincipal,
      };
    }

    const result = [monthlyAmortization, yearlyAmortization];
    amortizationCache.set(cacheKey, result);
    return result;
  }
};
