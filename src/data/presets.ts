import type {
  FontPairing,
  PalettePreset,
  ScaleRatioName,
} from "../types/typography";

export const SCALE_RATIOS: Record<ScaleRatioName, number> = {
  "Minor Third (1.200)": 1.2,
  "Major Third (1.250)": 1.25,
  "Perfect Fourth (1.333)": 1.333,
  "Golden Ratio (1.618)": 1.618,
};

export const FONT_PAIRINGS: FontPairing[] = [
  {
    id: "pair-editorial",
    label: "Classic Broadsheet (Serif + Sans)",
    headingClass: "font-serif font-black tracking-tight",
    bodyClass: "font-sans",
    tag: "Editorial",
  },
  {
    id: "pair-swiss",
    label: "Swiss International (Geometric Sans)",
    headingClass: "font-sans font-black tracking-tighter uppercase",
    bodyClass: "font-sans",
    tag: "Modernist",
  },
  {
    id: "pair-technical",
    label: "Technical Monograph (Serif + Mono)",
    headingClass: "font-serif font-bold",
    bodyClass: "font-mono",
    tag: "Documentation",
  },
];

export const PALETTE_PRESETS: PalettePreset[] = [
  {
    id: "pal-newsprint",
    name: "Crisp Newsprint",
    bgHex: "#FFFFFF",
    fgHex: "#09090B",
    accentHex: "#2563EB",
  },
  {
    id: "pal-ivory",
    name: "Warm Ivory Paper",
    bgHex: "#FAF6EE",
    fgHex: "#1C1917",
    accentHex: "#EA580C",
  },
  {
    id: "pal-cobalt",
    name: "Blueprint Poster",
    bgHex: "#EFF6FF",
    fgHex: "#1E3A8A",
    accentHex: "#DC2626",
  },
  {
    id: "pal-obsidian",
    name: "Inverted Ink",
    bgHex: "#111827",
    fgHex: "#F9FAFB",
    accentHex: "#FACC15",
  },
];
