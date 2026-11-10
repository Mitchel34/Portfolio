"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { type KeyboardEvent, useRef, useState } from "react";

import { KeywordLine } from "@/components/KeywordLine";
import { Readout } from "@/components/Readout";
import { research } from "@/lib/content";

type EvidenceTabId = "inputs" | "architecture" | "evaluation" | "outcome";

type EvidenceTab = {
  id: EvidenceTabId;
  label: string;
  eyebrow: string;
  title: string;
  detail: string;
  note: string;
  tokens: string[];
};

const evidenceTabs: EvidenceTab[] = [
  {
    id: "inputs",
    label: "01 · Inputs",
    eyebrow: "Retrospective inputs",
    title: "Discharge history, weather, and soil.",
    detail: research.architecture[1],
    note: research.constraints[0],
    tokens: ["USGS discharge", "Issued HRRR", "Initial soil", "Simulated delay"],
  },
  {
    id: "architecture",
    label: "02 · Models",
    eyebrow: "Four assessed model families",
    title: "Predict discharge directly, with a shared assessment.",
    detail: research.architecture[2],
    note: research.architecture[0],
    tokens: ["LSTM", "Transformer", "GRU–Transformer", "Mamba2–Transformer"],
  },
  {
    id: "evaluation",
    label: "03 · Evaluation",
    eyebrow: "Saved-model assessment complete",
    title: "Score frozen models by site and lead time.",
    detail: research.evaluation[0] + " " + research.evaluation[1],
    note: research.evaluation[2],
    tokens: ["DirectFlow H1–18", "Matched NWM H1–16", "Temporal splits"],
  },
  {
    id: "outcome",
    label: "04 · Outputs",
    eyebrow: "Scientific review ongoing",
    title: "Assessment evidence and writing in progress.",
    detail:
      "Saved-model assessment and extreme-peak diagnostics are complete. A results manuscript for Water Resources Research is in preparation, and a separate NextGen software paper for Environmental Modelling & Software is planned. Neither manuscript is published.",
    note: research.scopeNote,
    tokens: ["Public assessment", "Peak diagnostics", "Manuscripts in progress"],
  },
];

const inputNodes: Array<[label: string, position: string]> = [
  ["USGS history", "left-2 top-2"],
  ["Issued HRRR", "right-2 top-2"],
  ["Initial soil", "bottom-2 left-2"],
  ["Issue time", "bottom-2 right-2"],
];

function InputsVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-48 w-full max-w-[22.5rem]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 360 192"
        preserveAspectRatio="none"
        focusable="false"
      >
        <path
          d="M56 32 L180 96 L304 32 M56 160 L180 96 L304 160"
          fill="none"
          className="stroke-muted-foreground"
          strokeDasharray="4 5"
        />
      </svg>
      {inputNodes.map(([label, position]) => (
        <div
          key={label}
          className={
            "absolute " +
            position +
            " grid h-12 w-24 place-items-center rounded-[4px] border border-input bg-card mono-label text-muted-foreground"
          }
        >
          {label}
        </div>
      ))}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-[4px] border border-input bg-card px-3 py-2 mono-label text-foreground">
        Retrospective alignment
      </div>
    </div>
  );
}

const architectureSteps: Array<[step: string, label: string]> = [
  ["01", "Discharge, weather, soil"],
  ["02", "DirectFlow model"],
  ["03", "H1–18 discharge"],
];

function ArchitectureVisual() {
  return (
    <div aria-hidden="true" className="grid min-h-48 place-items-center">
      <div className="grid w-full max-w-md grid-cols-1 items-center gap-2 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]">
        {architectureSteps.map(([step, label], index) => (
          <div key={step} className="contents">
            <div className="min-w-0 rounded-[4px] border border-input bg-card px-2 py-3 text-center sm:py-4">
              <span className="block mono-label text-primary">{step}</span>
              <span className="mt-2 block text-body-sm font-medium text-foreground">{label}</span>
            </div>
            {index < architectureSteps.length - 1 ? (
              <span className="rotate-90 text-center font-mono text-foreground sm:rotate-0">→</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Schematic chronological partitions; forecast issue time varies within evaluation periods. */
const RULER_START = 8;
const RULER_END = 352;
const tickPositions = Array.from(
  { length: Math.floor((RULER_END - RULER_START) / 24) + 1 },
  (_, index) => RULER_START + index * 24,
);

function EvaluationVisual() {
  return (
    <div aria-hidden="true">
      <svg viewBox="0 0 360 64" className="h-16 w-full" focusable="false">
        <rect x={8} y={20} width={192} height={18} rx={2} className="fill-muted" />
        <rect x={200} y={20} width={72} height={18} rx={2} className="fill-border" />
        <rect x={272} y={20} width={80} height={18} rx={2} className="fill-foreground/10" />
        <line x1={RULER_START} x2={RULER_END} y1={44} y2={44} className="stroke-input" />
        {tickPositions.map((x) => (
          <line key={x} x1={x} x2={x} y1={44} y2={48} className="stroke-muted-foreground" />
        ))}
      </svg>
      <div className="mx-[2.2222%] grid grid-cols-[192fr_72fr_80fr] mono-label text-muted-foreground">
        <span>Train</span>
        <span><span className="sm:hidden">Val.</span><span className="hidden sm:inline">Validation</span></span>
        <span>Test</span>
      </div>
      <p className="mt-2 text-footnote text-muted-foreground">
        Schematic time splits. Revised historical discharge uses a simulated two-hour delay; original publication times are not reconstructed.
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["RMSE", "NSE", "MAE"].map((metric) => (
          <div key={metric} className="rounded-[4px] border border-border bg-card px-2 py-2 text-center">
            <p className="mono-label text-foreground">{metric}</p>
            <p className="text-footnote text-muted-foreground">by site × lead time</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OutcomeVisual() {
  return (
    <Readout
      value="1–18 h"
      unit="independent DirectFlow discharge forecasts"
      status="in-progress"
      footnote="Saved-model assessment is complete; scientific review continues. Matched NWM comparisons cover H1–16."
    />
  );
}

function EvidenceVisual({ tab }: { tab: EvidenceTab }) {
  switch (tab.id) {
    case "inputs":
      return <InputsVisual />;
    case "architecture":
      return <ArchitectureVisual />;
    case "evaluation":
      return <EvaluationVisual />;
    case "outcome":
      return <OutcomeVisual />;
  }
}

export function ModelEvidenceExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();
  const activeTab = evidenceTabs[activeIndex];

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % evidenceTabs.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + evidenceTabs.length) % evidenceTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = evidenceTabs.length - 1;
    if (nextIndex === null) return;

    event.preventDefault();
    setActiveIndex(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section aria-labelledby="hydra-evidence-title" className="rounded-[4px] border border-border bg-card">
      <div className="border-b border-border px-5 py-4">
        <p className="mono-label text-muted-foreground">Figure 1 · interactive</p>
        <h3 id="hydra-evidence-title" className="mt-1 font-serif text-title text-foreground">
          Inside the DirectFlow pipeline
        </h3>
      </div>

      <div role="tablist" aria-label="HYDRA evidence layers" className="flex flex-wrap border-b border-border px-2">
        {evidenceTabs.map((tab, index) => {
          const selected = index === activeIndex;

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              id={"hydra-tab-" + tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={"hydra-panel-" + tab.id}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={
                "mono-label -mb-px h-11 border-b-2 px-3 transition-colors duration-200 " +
                (selected
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground")
              }
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeTab.id}
          id={"hydra-panel-" + activeTab.id}
          role="tabpanel"
          aria-labelledby={"hydra-tab-" + activeTab.id}
          tabIndex={0}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="p-5 sm:p-6"
        >
          <div className="rounded-[4px] border border-border bg-surface p-4">
            <EvidenceVisual tab={activeTab} />
          </div>

          <p className="mt-5 mono-label text-muted-foreground">{activeTab.eyebrow}</p>
          <h4 className="mt-2 font-serif text-title text-foreground">{activeTab.title}</h4>
          <p className="mt-3 text-body-sm text-muted-foreground">{activeTab.detail}</p>
          <p className="mt-3 border-l border-border pl-3 text-footnote text-muted-foreground">{activeTab.note}</p>
          <KeywordLine label="Markers" items={activeTab.tokens} className="mt-4" />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
