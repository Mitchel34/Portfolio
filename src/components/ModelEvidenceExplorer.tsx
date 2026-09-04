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
    label: "(a) Reforecasts",
    eyebrow: "Reforecast generation",
    title: "The forecasts to learn from are generated, not scraped.",
    detail: research.architecture[0] + " " + research.architecture[1],
    note: "Consistent initialization, lead-time, and version metadata make every training example traceable to the forecast that produced it.",
    tokens: ["NextGen", "Reforecasts", "USGS observations", "Issue time"],
  },
  {
    id: "architecture",
    label: "(b) Models",
    eyebrow: "Three model families",
    title: "Recurrent, attention, and state-space models on identical inputs.",
    detail: research.architecture[2],
    note: "LSTM, vanilla Transformer, and Mamba-style state-space models are trained as post-processors with the same inputs and the same splits, so differences are attributable to the model.",
    tokens: ["LSTM", "Transformer", "Mamba (SSM)", "PyTorch"],
  },
  {
    id: "evaluation",
    label: "(c) Evaluation",
    eyebrow: "Leakage-aware · by lead time",
    title: "Evaluation mirrors real forecasting constraints.",
    detail: research.evaluation[0] + " " + research.evaluation[1],
    note: research.evaluation[2],
    tokens: ["1–18 h lead times", "Site × lead time", "Temporal splits"],
  },
  {
    id: "outcome",
    label: "(d) Outputs",
    eyebrow: "Planned outputs",
    title: "Two manuscripts and the software behind them.",
    detail:
      "A results manuscript for Water Resources Research and a software paper for Environmental Modelling & Software are in preparation.",
    note: research.scopeNote,
    tokens: ["WRR manuscript", "EM&S software paper", "Public code"],
  },
];

const inputNodes: Array<[label: string, position: string]> = [
  ["NextGen", "left-2 top-2"],
  ["USGS", "right-2 top-2"],
  ["Lead time", "bottom-2 left-2"],
  ["Version", "bottom-2 right-2"],
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
        Align at issue time
      </div>
    </div>
  );
}

const architectureSteps: Array<[step: string, label: string]> = [
  ["01", "NextGen reforecast"],
  ["02", "Post-processing model"],
  ["03", "Improved forecast"],
];

function ArchitectureVisual() {
  return (
    <div aria-hidden="true" className="grid min-h-48 place-items-center">
      <div className="grid w-full max-w-md grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2">
        {architectureSteps.map(([step, label], index) => (
          <div key={step} className="contents">
            <div className="rounded-[4px] border border-input bg-card px-2 py-4 text-center">
              <span className="block mono-label text-primary">{step}</span>
              <span className="mt-2 block text-body-sm font-medium text-foreground">{label}</span>
            </div>
            {index < architectureSteps.length - 1 ? (
              <span className="font-mono text-foreground">→</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Time ruler geometry (viewBox units). Bands span x=8..352; the Test band starts at issue time. */
const RULER_START = 8;
const RULER_END = 352;
const ISSUE_TIME_X = 272;
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
        <line
          x1={ISSUE_TIME_X}
          x2={ISSUE_TIME_X}
          y1={10}
          y2={52}
          className="stroke-primary"
          strokeWidth={1.5}
        />
        <polygon
          points={`${ISSUE_TIME_X - 3},10 ${ISSUE_TIME_X + 3},10 ${ISSUE_TIME_X},4`}
          className="fill-primary"
        />
      </svg>
      <div className="mx-[2.2222%] grid grid-cols-[192fr_72fr_80fr] mono-label text-muted-foreground">
        <span>Train</span>
        <span>Validation</span>
        <span>Test</span>
      </div>
      <p className="mt-2 text-footnote text-muted-foreground">
        <span className="text-primary">▲</span> forecast issue time: model inputs are restricted to what
        existed before it.
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["RMSE", "NSE", "KGE"].map((metric) => (
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
      unit="forecast lead times targeted by the post-processing model"
      status="in-progress"
      footnote="Results will be published with the manuscripts; no performance number is reported yet."
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
          Inside the HYDRA pipeline
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
