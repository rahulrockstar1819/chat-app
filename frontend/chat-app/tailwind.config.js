// tailwind.config.js
import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,ts,jsx,tsx}", // Ensure your app's files are scanned first
  "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}" // Then scan HeroUI files
];
export const theme = {
  extend: {},
  darkMode: "class",
}
export const plugins = [heroui()];