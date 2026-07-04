import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: path.resolve(__dirname, "src"),
  recommendedConfig: {
    extends: ["next/core-web-vitals", "next/typescript"],
  },
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "dist/**"],
    files: ["**/*.{ts,tsx,js,jsx,mjs,cjs}"],
  },
];

export default eslintConfig;
