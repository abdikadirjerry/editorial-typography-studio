import React, { useState, useMemo } from "react";
import { FONT_PAIRINGS, PALETTE_PRESETS, SCALE_RATIOS } from "./data/presets";
import type {
  FontPairing,
  PalettePreset,
  ScaleRatioName,
} from "./types/typography";
import { generateModularScale } from "./utils/typeEngine";
import { ControlSidebar } from "./components/ControlSidebar";
import { SpecimenCanvas } from "./components/SpecimenCanvas";

export function App() {
  const [basePx, setBasePx] = useState<number>(16);
  const [ratioName, setRatioName] = useState<ScaleRatioName>(
    "Perfect Fourth (1.333)",
  );
  const [pairing, setPairing] = useState<FontPairing>(FONT_PAIRINGS[0]);
  const [palette, setPalette] = useState<PalettePreset>(PALETTE_PRESETS[0]);

  const steps = useMemo(
    () => generateModularScale(basePx, SCALE_RATIOS[ratioName]),
    [basePx, ratioName],
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-950 selection:bg-orange-500 selection:text-white">
      <header className="bg-black text-white px-6 md:px-10 py-3.5 flex items-center justify-between border-b-2 border-black">
        <div className="flex items-center gap-3">
          <span className="bg-orange-500 text-black font-black px-2 py-0.5 text-xs uppercase">
            TYPE//LAB
          </span>
          <h1 className="text-xs md:text-sm font-black uppercase tracking-widest">
            Editorial Typography &amp; WCAG Contrast Studio
          </h1>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
          REACT + TYPESCRIPT + NEO-BRUTALIST PRINT UI
        </span>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        <ControlSidebar
          basePx={basePx}
          onBasePxChange={setBasePx}
          ratioName={ratioName}
          onRatioChange={setRatioName}
          pairing={pairing}
          onPairingChange={setPairing}
          palette={palette}
          onPaletteChange={setPalette}
          steps={steps}
        />

        <SpecimenCanvas steps={steps} pairing={pairing} palette={palette} />
      </div>
    </div>
  );
}

export default App;
