# EMI Calculator

A modern, responsive EMI (Equated Monthly Installment) calculator built with React and Material-UI. Calculate loan EMIs and view detailed amortization schedules.

🔗 **Live Demo:** [https://manthan2812.github.io/emi-calculator/](https://manthan2812.github.io/emi-calculator/)

## Features

- 🧮 Instant EMI calculations with real-time updates
- 📊 Monthly and yearly amortization schedules
- 🌓 Dark/Light theme support
- 📱 Responsive design for all devices

## Tech Stack

- React + Vite
- Material-UI (MUI)
- GitHub Pages

## Development

1. Clone the repository:

```bash
git clone https://github.com/manthan2812/emi-calculator.git
```

2. Navigate to the project directory:

```bash
cd emi-calculator
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:5173/emi-calculator/](http://localhost:5173/emi-calculator/) to view it in your browser.

## Deployment

This project is deployed using GitHub Pages. To deploy your own version:

1. Update `vite.config.js` to include your base URL:

```js
export default defineConfig({
  base: "/emi-calculator/", // Replace with your repo name
  // ... other config
});
```

2. Install gh-pages:

```bash
npm install gh-pages --save-dev
```

3. Add deploy scripts to `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

4. Deploy to GitHub Pages:

```bash
npm run deploy
```

## Local Development

1. Clone and install:

```bash
git clone https://github.com/manthan2812/emi-calculator.git
cd emi-calculator
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open [http://localhost:5173/emi-calculator/](http://localhost:5173/emi-calculator/)

## Usage

1. Visit the [EMI Calculator](https://manthan2812.github.io/emi-calculator/)
2. Enter your loan amount (principal)
3. Adjust the interest rate and loan term
4. View the calculated EMI and total amounts
5. Explore the monthly/yearly amortization schedules
6. Toggle between light and dark themes
