import { type Wallpaper, type WallpaperSection } from "../types/wallpaper.type"
import { images } from "./images.url"

export const WALLPAPER_SECTIONS: WallpaperSection[] = [
  { id: "places", title: "Places" },
  { id: "abstract", title: "Abstract" }
]

export const WALLPAPERS: Wallpaper[] = [
  // Places (8 items)
  {
    id: "artemis-ii-nasa",
    category: "places",
    label: "Artemis II NASA",
    url: images.artemisIiNasa5k
  },
  {
    id: "eiffel-tower-night",
    category: "places",
    label: "Eiffel Tower Night",
    url: images.eiffelTowerNightTimeGlowingLightsStarrySkyLandmark
  },
  {
    id: "eiffel-tower-paris",
    category: "places",
    label: "Eiffel Tower Paris",
    url: images.eiffelTowerParisLightsSkyViewCloudsIconicMetal
  },
  {
    id: "empire-state",
    category: "places",
    label: "Empire State Building",
    url: images.empireState
  },
  {
    id: "glacier-mountains",
    category: "places",
    label: "Glacier Mountains & Milky Way",
    url: images.glacierMountainsSnowCoveredNightTimeLandscapeMilky
  },
  {
    id: "golden-gate-bridge",
    category: "places",
    label: "Golden Gate Bridge",
    url: images.goldenGateBridgeEveningCoastlineSanFranciscoBaker
  },
  {
    id: "moon-night",
    category: "places",
    label: "Moonlit Night Seascape",
    url: images.moonNightCloudsOceanSeascape5k8k
  },
  {
    id: "independence-day",
    category: "places",
    label: "Independence Day Fireworks",
    url: images.independenceDay
  },

  // Abstract (8 items)
  {
    id: "blue-abstract",
    category: "abstract",
    label: "Blue Abstract",
    url: images.blueAbstract
  },
  {
    id: "geometric-hexagons",
    category: "abstract",
    label: "Geometric Hexagons",
    url: images.geometricHexagons
  },
  {
    id: "green-abstract",
    category: "abstract",
    label: "Green Abstract",
    url: images.greenAbstract
  },
  {
    id: "infinity-purple",
    category: "abstract",
    label: "Infinity Purple",
    url: images.infinityPurple
  },
  {
    id: "iridescent-spheres",
    category: "abstract",
    label: "Iridescent Spheres",
    url: images.iridescentSpheres
  },
  {
    id: "pink-abstract",
    category: "abstract",
    label: "Pink Abstract",
    url: images.pinkAbstract5k
  },
  {
    id: "samsung-galaxy-note10",
    category: "abstract",
    label: "Galaxy Note 10 Bubble",
    url: images.samsungGalaxyNote10BubbleGreenStockAndroid10
  },
  {
    id: "windows-11-abstract",
    category: "abstract",
    label: "Windows 11 Abstract",
    url: images.windows11Abstract
  }
]

export function frameStyleFromUrl(url: string) {
  return {
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
}

export function getWallpaperById(id: string) {
  return WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0]
}