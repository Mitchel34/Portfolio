"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BarChart3, BrainCircuit, Database, ShieldCheck } from "lucide-react";
import { type KeyboardEvent, useRef, useState } from "react";

import { research, thesisImpactStat } from "@/lib/content";

const resultRange = thesisImpactStat.match(/\d+[–-]\d+%/)?.[0] ?? "Preliminary";

const evidenceTabs = [
  {
    id: "inputs",
    label: "Inputs",
    eyebrow: "4 source families",
    icon: Database,
    title: "Forecast context enters with its timing intact.",
    detail: research.architecture[0],
    note: "Each signal is aligned to the information that would have been available at forecast time.",
    tokens: ["NWM forecasts", "USGS observations", "ERA5 signals", "Basin context"],
  },
  {
    id: "architecture",
    label: "Model",
    eyebrow: "Residual correction",
    icon: BrainCircuit,
    title: "The network learns the correction, not the river from scratch.",
    detail: research.architecture[1] + " " + research.architecture[2],
    note: "Transformer and GRU experiments stay comparable through a modular, configuration-driven pipeline.",
    tokens: ["Transformer", "GRU", "PyTorch", "Hydra Config"],
  },
  {
    id: "evaluation",
    label: "Evaluation",
    eyebrow: "Leakage-aware",
    icon: ShieldCheck,
    title: "Evaluation mirrors real forecasting constraints.",
    detail: research.evaluation[0] + " " + research.evaluation[1],
    note: research.evaluation[2],
    tokens: ["RMSE", "NSE", "KGE", "Site × horizon"],
  },
  {
    id: "outcome",
    label: "Outcome",
    eyebrow: resultRange,
    icon: BarChart3,
    title: "A promising signal, presented with its boundary.",
    detail: thesisImpactStat,
    note: "Preliminary result. The final analysis and manuscript remain in progress.",
    tokens: ["Preliminary", "RMSE", "Tested LSTM baselines"],
  },
] as const;

type EvidenceTab = (typeof evidenceTabs)[number];

function InputsVisual() {
  return (
    <div aria-hidden="true" className="relative mx-auto h-48 max-w-sm">
      <svg className="absolute inset-0 h-full w-full text-primary/35" viewBox="0 0 360 192">
        <path d="M62 42 L180 96 L298 42 M62 150 L180 96 L298 150" fill="none" stroke="currentColor" strokeDasharray="4 5" />
      </svg>
      {[
        ["NWM", "left-2 top-2"],
        ["USGS", "right-2 top-2"],
        ["ERA5", "bottom-2 left-2"],
        ["BASIN", "bottom-2 right-2"],
      ].map(([label, position]) => (
        <div
          key={label}
          className={
            "absolute " +
            position +
            " flex h-14 w-20 items-center justify-center rounded-xl border border-border bg-card/95 font-mono text-[10px] tracking-[0.16em] text-muted-foreground shadow-sm"
          }
        >
          {label}
        </div>
      ))}
      <div className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 rotate-45 place-items-center rounded-2xl border border-primary/40 bg-primary/10 shadow-[0_0_48px_-18px_rgba(11,95,255,0.9)]">
        <Database className="h-6 w-6 -rotate-45 text-primary" />
      </div>
    </div>
  );
}

function ArchitectureVisual() {
  return (
    <div aria-hidden="true" className="grid min-h-48 place-items-center">
      <div className="grid w-full max-w-md grid-cols-[1fr,auto,1fr,auto,1fr] items-center gap-2">
        {[
          ["01", "Forecast"],
          ["02", "Residual"],
          ["03", "Corrected"],
        ].map(([step, label], index) => (
          <div key={step} className="contents">
            <div className="rounded-xl border border-border bg-card/90 px-2 py-4 text-center shadow-sm">
              <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                {step}
              </span>
              <span className="mt-2 block text-xs font-semibold text-foreground sm:text-sm">{label}</span>
            </div>
            {index < 2 ? (
              <span className="font-mono text-sm text-primary" aria-hidden="true">
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function EvaluationVisual() {
  return (
    <div aria-hidden="true" className="grid min-h-48 place-items-center">
      <div className="w-full max-w-md">
        <div className="grid grid-cols-3 gap-3">
          {["RMSE", "NSE", "KGE"].map((metric, index) => (
            <div
              key={metric}
              className="relative grid aspect-square place-items-center overflow-hidden rounded-full border border-border bg-card/90"
            >
              <span
                className="absolute inset-2 rounded-full border border-dashed border-primary/35"
                style={{ transform: "rotate(" + index * 32 + "deg)" }}
              />
              <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-foreground">
                {metric}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-2">
          {["Train", "Validate", "Test"].map((split, index) => (
            <div key={split} className="flex min-w-0 flex-1 items-center gap-2">
              <div className="min-w-0 flex-1 rounded-md border border-border bg-card/75 px-2 py-2 text-center font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
                {split}
              </div>
              {index < 2 ? <span className="text-[10px] text-primary">→</span> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function OutcomeVisual() {
  return (
    <div aria-hidden="true" className="grid min-h-48 place-items-center">
      <div className="w-full max-w-md rounded-2xl border border-primary/25 bg-primary/[0.055] p-5">
        <p className="font-serif text-5xl font-medium tracking-tight text-foreground sm:text-6xl">
          {resultRange}
        </p>
        <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
          observed RMSE reduction range
        </p>
        <div className="relative mt-7 h-1 rounded-full bg-border">
          <div className="absolute left-[26%] right-[46%] h-1 rounded-full bg-gradient-to-r from-primary to-accent" />
          <span className="absolute left-[26%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-primary" />
          <span className="absolute left-[54%] top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-accent" />
        </div>
        <div className="mt-3 flex justify-between font-mono text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
          <span>0%</span>
          <span>Tested LSTM baselines</span>
          <span>100%</span>
        </div>
      </div>
    </div>
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
    <section
      aria-labelledby="hydra-evidence-title"
      className="overflow-hidden rounded-[1.5rem] border border-border/80 bg-background/80 shadow-[0_24px_70px_-48px_rgba(11,95,255,0.65)]"
    >
      <div className="border-b border-border/75 px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
              Interactive evidence trace
            </p>
            <h4 id="hydra-evidence-title" className="mt-1.5 text-lg font-semibold tracking-tight text-foreground">
              Inside the HYDRA pipeline
            </h4>
          </div>
          <span className="mt-0.5 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Research
          </span>
        </div>
      </div>

      <div
        role="tablist"
        aria-label="HYDRA evidence layers"
        className="grid grid-cols-2 gap-px border-b border-border/75 bg-border/75 sm:grid-cols-4"
      >
        {evidenceTabs.map((tab, index) => {
          const Icon = tab.icon;
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
              data-cursor-label={tab.label}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={
                "flex min-h-14 items-center justify-center gap-2 bg-card px-3 py-3 text-xs font-semibold transition " +
                (selected
                  ? "text-primary shadow-[inset_0_-2px_0_0_currentColor]"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              <Icon className="h-3.5 w-3.5" />
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
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="p-5 sm:p-6"
        >
          <div className="rounded-2xl border border-border/70 bg-surface/45 p-4">
            <EvidenceVisual tab={activeTab} />
          </div>

          <div className="mt-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
              {activeTab.eyebrow}
            </p>
            <h5 className="mt-2 font-serif text-2xl font-medium tracking-tight text-foreground">
              {activeTab.title}
            </h5>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{activeTab.detail}</p>
            <p className="mt-3 border-l-2 border-accent/50 pl-3 text-xs leading-relaxed text-muted-foreground">
              {activeTab.note}
            </p>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label={activeTab.label + " evidence markers"}>
            {activeTab.tokens.map((token) => (
              <li
                key={token}
                className="rounded-full border border-border bg-card px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground"
              >
                {token}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
