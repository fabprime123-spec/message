import { type ReactNode, useEffect, useState } from "react"
import { frameStyleFromUrl, getWallpaperById } from "../constants/wallpapers"
import { WallpaperContext, type WallpaperContextValue } from "./wallpaper"
import { type Wallpaper } from "../types/wallpaper.type" // Assuming Wallpaper type is defined here

const STORAGE_KEY = "chat-wallpaper-id"

function readStoredWallpaperId(): string {
  const wallpaperId = localStorage.getItem(STORAGE_KEY)
  if (wallpaperId) return wallpaperId
  // Provide a default wallpaper ID if none is stored
  return "eiffel-tower-night"
}

export function WallpaperProvider({ children }: { children: ReactNode }) {
  const [wallpaperId, setWallpaperIdState] = useState<string>(readStoredWallpaperId)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, wallpaperId)
  }, [wallpaperId])

  const wallpaper: Wallpaper = getWallpaperById(wallpaperId)

  const setWallpaperId = (id: string) => {
    setWallpaperIdState(id)
  }

  const frameStyle = frameStyleFromUrl(wallpaper.url)

  const value: WallpaperContextValue = { wallpaperId, setWallpaperId, wallpaper, frameStyle }

  return (
    <WallpaperContext.Provider value={value}>
      {children}
    </WallpaperContext.Provider>
  )
}