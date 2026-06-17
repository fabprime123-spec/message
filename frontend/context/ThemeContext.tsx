import { type ReactNode, useEffect, useLayoutEffect, useState } from "react"
import { DefaultAccent } from "../constants/accent.colors" // Import DefaultAccent
import { applyThemePresetToDocument, isValidThemePreset, ThemeContext, type ThemeContextValue } from "./theme" // Import ThemeContextValue

function getSystemTheme() {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function readStoredTheme() {
  const theme = localStorage.getItem("theme")
  if (theme === "light" || theme === "dark") return theme

  return null
}

function applyDomTheme(theme: string) {
  const root = document.documentElement
  root.classList.toggle("dark", theme === "dark")
  root.setAttribute("data-theme", theme === "dark" ? "dark" : "light")
}

function readStoredThemePreset(): string { // Specify return type as string
  const themePreset = localStorage.getItem("theme-preset")
  if (themePreset && isValidThemePreset(themePreset)) return themePreset

  return DefaultAccent // Return the default accent ID, not the AccentColors array
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<string>(() => readStoredTheme() ?? getSystemTheme())
  const [themePreset, setThemePresetState] = useState<string>(readStoredThemePreset)

  // this applies light/dark mode
  useLayoutEffect(() => {
    applyDomTheme(theme)
  }, [theme])

  // this applies the theme preset, like sky, spotify, etc.
  // The `applyThemePresetToDocument` function expects a string ID.
  useLayoutEffect(() => {
    applyThemePresetToDocument(themePreset)
  }, [themePreset])

  // this stores the theme and theme preset in local storage
  useEffect(() => {
    localStorage.setItem("theme", theme)
    localStorage.setItem("theme-preset", themePreset)
  }, [theme, themePreset])

  const setTheme = (next: string | ((prev: string) => string)) => setThemeState(next)

  const toggleTheme = () => {
    setThemeState((t) => (t === "dark" ? "light" : "dark"))
  }

  const setThemePreset = (next: string | ((prev: string) => string)) => {
    setThemePresetState((prev) => {
      const resolved = typeof next === "function" ? next(prev) : next
      return isValidThemePreset(resolved) ? resolved : DefaultAccent // Use DefaultAccent here too
    })
  }

  const value: ThemeContextValue = { theme, setTheme, toggleTheme, themePreset, setThemePreset }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}