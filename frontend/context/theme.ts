import { createContext, useContext } from "react"
import { AccentColors, DefaultAccent } from "../constants/accent.colors"

// Define the interface for the ThemeContext value
export interface ThemeContextValue {
  theme: string;
  setTheme: (nextTheme: string | ((prevTheme: string) => string)) => void;
  toggleTheme: () => void;
  themePreset: string;
  setThemePreset: (nextPreset: string | ((prevPreset: string) => string)) => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null)

const PRESET_IDS = new Set(AccentColors.map((p) => p.id))

export function isValidThemePreset(presetId: string) {
  return PRESET_IDS.has(presetId)
}

/** apply preset to `<html>` immediately so `--accent` updates before paint. */
export function applyThemePresetToDocument(presetId: string) {
  const id = isValidThemePreset(presetId) ? presetId : DefaultAccent
  document.documentElement.setAttribute("data-theme-preset", id)
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}