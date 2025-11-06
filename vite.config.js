import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/emi-calculator/", // Add this line - must match your repository name
  plugins: [react()],
});
