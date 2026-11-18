import React, { useState } from "react";
import type { FontPairing, PalettePreset, TypeStep } from "../types/typography";
import { calculateContrastRatio } from "../utils/typeEngine";

interface SpecimenCanvasProps {
  steps: TypeStep[];
  pairing: FontPairing;
  palette: PalettePreset;
}

export const SpecimenCanvas: React.FC<SpecimenCanvasProps> = ({
  steps,
  pairing,
  palette,
}) => {
  const [headlineText, setHeadlineText] = useState(
    "Architecture of Modern Editorial Systems",
  );
  const [leadText, setLeadText] = useState(
    "Harmonious typographic hierarchy establishes immediate visual authority, guiding readers effortlessly from broadsheet headlines into dense technical prose.",
  );

  const wcag = calculateContrastRatio(palette.fgHex, palette.bgHex);

  const displayStep = steps[0];
  const h2Step = steps[2];
  const leadStep = steps[3];
  const bodyStep = steps[4];
  const captionStep = steps[5];

  return (
    <main className="flex-1 p-6 md:p-10 space-y-8 overflow-y-auto">
      {/* WCAG Accessibility Ribbon */}
      <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_#000] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase">
            WCAG 2.1 Contrast Score:
          </span>
          <span className="text-lg font-black bg-zinc-900 text-white px-3 py-0.5">
            {wcag.ratio}:1
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-black">
          <span
            className={`px-3 py-1 border-2 border-black ${
              wcag.aaPass
                ? "bg-emerald-400 text-black"
                : "bg-rose-500 text-white"
            }`}
          >
            AA Normal: {wcag.aaPass ? "PASS" : "FAIL"}
          </span>
          <span
            className={`px-3 py-1 border-2 border-black ${
              wcag.aaaPass
                ? "bg-emerald-400 text-black"
                : "bg-amber-300 text-black"
            }`}
          >
            AAA Enhanced: {wcag.aaaPass ? "PASS" : "FAIL"}
          </span>
        </div>
      </div>

      {/* Live Broadsheet Specimen */}
      <article
        className="border-2 border-black p-8 md:p-12 shadow-[6px_6px_0px_0px_#000] transition-colors space-y-6"
        style={{ backgroundColor: palette.bgHex, color: palette.fgHex }}
      >
        <div
          className="flex items-center justify-between border-b-2 pb-3 text-xs font-bold uppercase tracking-widest"
          style={{ borderColor: palette.fgHex }}
        >
          <span>VOL. IV &bull; TYPE SPECIMEN SHEET</span>
          <span style={{ color: palette.accentHex }}>
            {pairing.tag} Edition
          </span>
        </div>

        <div
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) =>
            setHeadlineText(e.currentTarget.textContent || headlineText)
          }
          className={`${pairing.headingClass} outline-none focus:underline`}
          style={{
            fontSize: `${displayStep.sizePx}px`,
            lineHeight: displayStep.lineHeight,
          }}
        >
          {headlineText}
        </div>

        <p
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setLeadText(e.currentTarget.textContent || leadText)}
          className={`${pairing.bodyClass} font-medium opacity-90 outline-none`}
          style={{
            fontSize: `${leadStep.sizePx}px`,
            lineHeight: leadStep.lineHeight,
          }}
        >
          {leadText}
        </p>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t"
          style={{ borderColor: `${palette.fgHex}33` }}
        >
          <div className="space-y-2">
            <h3
              className={pairing.headingClass}
              style={{
                fontSize: `${h2Step.sizePx}px`,
                lineHeight: h2Step.lineHeight,
              }}
            >
              Grid Rhythm &amp; Proportion
            </h3>
            <p
              className={pairing.bodyClass}
              style={{
                fontSize: `${bodyStep.sizePx}px`,
                lineHeight: bodyStep.lineHeight,
              }}
            >
              Click directly on the headline or deck paragraph above to edit
              live specimen text. Every step in the modular scale recalculates
              dynamically in both pixels and root em units.
            </p>
          </div>

          <div
            className="p-5 border-2 flex flex-col justify-between"
            style={{ borderColor: palette.fgHex }}
          >
            <span
              className="text-xs font-black uppercase tracking-wider"
              style={{ color: palette.accentHex }}
            >
              Editorial Pull-Quote
            </span>
            <blockquote
              className={`${pairing.headingClass} my-3`}
              style={{ fontSize: `${leadStep.sizePx}px`, lineHeight: 1.25 }}
            >
              “Typography is the craft of endowing human language with a durable
              visual form.”
            </blockquote>
            <span
              className={`${pairing.bodyClass} opacity-75`}
              style={{ fontSize: `${captionStep.sizePx}px` }}
            >
              — Robert Bringhurst, The Elements of Typographic Style
            </span>
          </div>
        </div>
      </article>

      {/* Modular Scale Ladder */}
      <section className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_#000] space-y-4">
        <h2 className="text-xs font-black uppercase tracking-wider border-b-2 border-black pb-2">
          Computed Modular Type Ladder
        </h2>
        <div className="divide-y-2 divide-zinc-200">
          {steps.map((step) => (
            <div
              key={step.level}
              className="py-3 flex flex-wrap items-baseline justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="bg-black text-white text-[10px] font-black px-2 py-0.5 uppercase">
                  {step.level}
                </span>
                <span className="text-xs font-bold text-zinc-600">
                  {step.sizePx}px / {step.sizeRem}rem (LH {step.lineHeight})
                </span>
              </div>
              <div
                className={`${pairing.headingClass} truncate max-w-xl`}
                style={{ fontSize: `${Math.min(step.sizePx, 42)}px` }}
              >
                {step.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};
