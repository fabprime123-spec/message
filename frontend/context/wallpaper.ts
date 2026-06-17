import { createContext, useContext } from "react"
import { type Wallpaper } from "../types/wallpaper.type" // Assuming Wallpaper type is defined here
import { frameStyleFromUrl } from "../constants/wallpapers" // To get the return type of frameStyleFromUrl

// Define the interface for the WallpaperContext value
export interface WallpaperContextValue {
  wallpaperId: string
  setWallpaperId: (id: string) => void
  wallpaper: Wallpaper
  frameStyle: ReturnType<typeof frameStyleFromUrl> // Dynamically get the return type of frameStyleFromUrl
}

// Initialize createContext with the specific interface or null
export const WallpaperContext = createContext<WallpaperContextValue | null>(null)

export function useWallpaper() {
  const ctx = useContext(WallpaperContext)
  if (!ctx) throw new Error("useWallpaper must be used within WallpaperProvider")
  return ctx
}