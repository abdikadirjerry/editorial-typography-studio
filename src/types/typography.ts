export type ScaleRatioName =
  | "Minor Third (1.200)"
  | "Major Third (1.250)"
  | "Perfect Fourth (1.333)"
  | "Golden Ratio (1.618)";

export interface FontPairing {
  id: string;
  label: string;
  headingClass: string;
  bodyClass: string;
  tag: string;
}

export interface PalettePreset {
  id: string;
  name: string;
  bgHex: string;
  fgHex: string;
  accentHex: string;
}

export interface TypeStep {
  level: string;
  label: string;
  sizePx: number;
  sizeRem: number;
  lineHeight: number;
}
