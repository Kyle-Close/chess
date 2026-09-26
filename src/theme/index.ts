import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  globalCss: {
    "html, body": {
      bg: "ink.950",
      color: "fg",
    },
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: `'Fraunces', Georgia, serif` },
        body: { value: `'Inter', system-ui, -apple-system, sans-serif` },
        mono: { value: `'JetBrains Mono', ui-monospace, monospace` },
      },
      colors: {
        ink: {
          950: { value: "#0c0d10" },
          900: { value: "#111317" },
          850: { value: "#16191e" },
          800: { value: "#1c2027" },
          700: { value: "#262b34" },
          600: { value: "#343a45" },
        },
        gold: {
          200: { value: "#f6e3b4" },
          300: { value: "#efcf86" },
          400: { value: "#e4b75e" },
          500: { value: "#cf9b3c" },
          600: { value: "#a9792a" },
        },
      },
    },
    semanticTokens: {
      radii: {
        l1: { value: "0.375rem" },
        l2: { value: "0.625rem" },
        l3: { value: "0.875rem" },
      },
      colors: {
        bg: {
          DEFAULT: { value: "{colors.ink.950}" },
          subtle: { value: "{colors.ink.900}" },
          muted: { value: "{colors.ink.800}" },
          emphasized: { value: "{colors.ink.700}" },
          panel: { value: "{colors.ink.850}" },
        },
        fg: {
          DEFAULT: { value: "#eceae4" },
          muted: { value: "#9a9ea8" },
          subtle: { value: "#6b707b" },
        },
        border: {
          DEFAULT: { value: "rgba(255, 255, 255, 0.08)" },
          muted: { value: "rgba(255, 255, 255, 0.06)" },
          emphasized: { value: "rgba(255, 255, 255, 0.16)" },
        },
        accent: {
          DEFAULT: { value: "{colors.gold.400}" },
          fg: { value: "{colors.gold.300}" },
          muted: { value: "rgba(228, 183, 94, 0.12)" },
        },
        gold: {
          solid: { value: "{colors.gold.400}" },
          contrast: { value: "#1a1408" },
          fg: { value: "{colors.gold.300}" },
          muted: { value: "rgba(228, 183, 94, 0.14)" },
          subtle: { value: "rgba(228, 183, 94, 0.08)" },
          emphasized: { value: "rgba(228, 183, 94, 0.24)" },
          focusRing: { value: "{colors.gold.400}" },
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
