import type { TypeStep } from "../types/typography";

const STEP_DEFINITIONS = [
  { level: "Display", label: "Hero Broadsheet Headline", power: 4, lh: 1.08 },
  { level: "H1", label: "Primary Article Title", power: 3, lh: 1.15 },
  { level: "H2", label: "Section Subheading", power: 2, lh: 1.25 },
  { level: "H3", label: "Lead Deck / Pull Quote", power: 1, lh: 1.35 },
  { level: "Body", label: "Standard Editorial Copy", power: 0, lh: 1.65 },
  {
    level: "Caption",
    label: "Byline & Footnote Metadata",
    power: -1,
    lh: 1.45,
  },
];

export function generateModularScale(
  basePx: number,
  ratio: number,
): TypeStep[] {
  return STEP_DEFINITIONS.map((step) => {
    const rawPx = basePx * Math.pow(ratio, step.power);
    const sizePx = Math.round(rawPx * 10) / 10;
    const sizeRem = Math.round((sizePx / 16) * 1000) / 1000;
    return {
      level: step.level,
      label: step.label,
      sizePx,
      sizeRem,
      lineHeight: step.lh,
    };
  });
}

function hexToRgb(hex: string): [number, number, number] {
  const cleaned = hex.replace("#", "");
  const full =
    cleaned.length === 3
      ? cleaned
          .split("")
          .map((c) => c + c)
          .join("")
      : cleaned;
  const num = parseInt(full, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function getRelativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((channel) => {
    const sRGB = channel / 255;
    return sRGB <= 0.03928
      ? sRGB / 12.92
      : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function calculateContrastRatio(
  fgHex: string,
  bgHex: string,
): {
  ratio: number;
  aaPass: boolean;
  aaaPass: boolean;
} {
  const lum1 = getRelativeLuminance(fgHex);
  const lum2 = getRelativeLuminance(bgHex);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const ratio = Math.round(((brightest + 0.05) / (darkest + 0.05)) * 100) / 100;

  return {
    ratio,
    aaPass: ratio >= 4.5,
    aaaPass: ratio >= 7.0,
  };
}
