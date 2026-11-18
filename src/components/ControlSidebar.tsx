import React, { useState } from "react";
import type {
  FontPairing,
  PalettePreset,
  ScaleRatioName,
  TypeStep,
} from "../types/typography";
import { FONT_PAIRINGS, PALETTE_PRESETS, SCALE_RATIOS } from "../data/presets";

interface ControlSidebarProps {
  basePx: number;
  onBasePxChange: (val: number) => void;
  ratioName: ScaleRatioName;
  onRatioChange: (val: ScaleRatioName) => void;
  pairing: FontPairing;
  onPairingChange: (val: FontPairing) => void;
  palette: PalettePreset;
  onPaletteChange: (val: PalettePreset) => void;
  steps: TypeStep[];
}

export const ControlSidebar: React.FC<ControlSidebarProps> = ({
  basePx,
  onBasePxChange,
  ratioName,
  onRatioChange,
  pairing,
  onPairingChange,
  palette,
  onPaletteChange,
  steps,
}) => {
  const [copiedCss, setCopiedCss] = useState(false);

  const handleExportCss = () => {
    const cssVars = steps
      .map(
        (s) =>
          `  --type-${s.level.toLowerCase()}: ${s.sizeRem}rem; /* ${s.sizePx}px */`,
      )
      .join("\n");
    const snippet = `:root {\n  --color-bg: ${palette.bgHex};\n  --color-fg: ${palette.fgHex};\n  --color-accent: ${palette.accentHex};\n${cssVars}\n}`;
    navigator.clipboard.writeText(snippet);
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  };

  return (
    <aside className="w-full lg:w-88 shrink-0 bg-zinc-50 border-b-2 lg:border-b-0 lg:border-r-2 border-black p-6 space-y-6">
      {/* Base Size & Ratio */}
      <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider border-b-2 border-black pb-2">
          01 // Modular Scale
        </h2>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-bold">
            <span>Base Body Size</span>
            <span className="bg-blue-600 text-white px-2 py-0.5">
              {basePx}px
            </span>
          </div>
          <input
            type="range"
            min={14}
            max={22}
            value={basePx}
            onChange={(e) => onBasePxChange(Number(e.target.value))}
            className="w-full accent-black cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold">Harmonic Ratio</label>
          <select
            value={ratioName}
            onChange={(e) => onRatioChange(e.target.value as ScaleRatioName)}
            className="w-full border-2 border-black bg-white px-3 py-2 text-xs font-bold focus:outline-none"
          >
            {(Object.keys(SCALE_RATIOS) as ScaleRatioName[]).map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Font Pairing */}
      <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-3">
        <h2 className="text-xs font-black uppercase tracking-wider border-b-2 border-black pb-2">
          02 // Typeface Pairing
        </h2>
        <div className="space-y-2">
          {FONT_PAIRINGS.map((item) => {
            const active = item.id === pairing.id;
            return (
              <button
                key={item.id}
                onClick={() => onPairingChange(item)}
                className={`w-full text-left p-2.5 border-2 border-black text-xs transition-all cursor-pointer ${
                  active
                    ? "bg-orange-500 text-white font-bold shadow-[2px_2px_0px_0px_#000]"
                    : "bg-white hover:bg-zinc-100 text-zinc-900 font-semibold"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{item.label}</span>
                  <span className="text-[10px] uppercase underline">
                    {item.tag}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Ink & Paper Palette */}
      <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-3">
        <h2 className="text-xs font-black uppercase tracking-wider border-b-2 border-black pb-2">
          03 // Ink &amp; Paper Swatches
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {PALETTE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onPaletteChange(preset)}
              className={`p-2 border-2 border-black text-left text-[11px] font-bold cursor-pointer transition-transform ${
                palette.id === preset.id
                  ? "ring-2 ring-blue-600 -translate-y-0.5"
                  : ""
              }`}
              style={{ backgroundColor: preset.bgHex, color: preset.fgHex }}
            >
              <span className="block truncate">{preset.name}</span>
              <span
                className="inline-block w-3 h-3 border border-black mt-1"
                style={{ backgroundColor: preset.accentHex }}
              />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200 text-[11px] font-bold">
          <label className="flex items-center justify-between border border-black px-2 py-1 bg-white">
            <span>Paper</span>
            <input
              type="color"
              value={palette.bgHex}
              onChange={(e) =>
                onPaletteChange({
                  ...palette,
                  id: "custom",
                  name: "Custom",
                  bgHex: e.target.value,
                })
              }
              className="w-5 h-5 cursor-pointer"
            />
          </label>
          <label className="flex items-center justify-between border border-black px-2 py-1 bg-white">
            <span>Ink</span>
            <input
              type="color"
              value={palette.fgHex}
              onChange={(e) =>
                onPaletteChange({
                  ...palette,
                  id: "custom",
                  name: "Custom",
                  fgHex: e.target.value,
                })
              }
              className="w-5 h-5 cursor-pointer"
            />
          </label>
        </div>
      </div>

      <button
        onClick={handleExportCss}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider text-xs py-3.5 border-2 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
      >
        {copiedCss ? "✓ CSS Tokens Copied!" : "Export CSS Variables"}
      </button>
    </aside>
  );
};
