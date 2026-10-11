"use client";

import { useState } from "react";

import { featuredWork } from "@/lib/content";

const layers = [
  { label: "01 · Generate", caption: "Weather, streamflow, and forecast inputs", color: "#8ed9d0" },
  { label: "02 · Correct", caption: "Learn a correction to the physical forecast", color: "#f3a08f" },
  { label: "03 · Evaluate", caption: "Compare against observations by lead time", color: "#eac880" },
];

// A conceptual terrain, drawn deterministically so the server and client agree.
const contours = Array.from({ length: 22 }, (_, row) => {
  const points = Array.from({ length: 65 }, (_, column) => {
    const x = column * 7.5;
    const y = 68 + row * 8.2
      - 54 * Math.exp(-((x - 130) ** 2) / 6800) * Math.sin((row + 4) / 12)
      - 48 * Math.exp(-((x - 360) ** 2) / 5400) * Math.sin((row + 2) / 10)
      + 18 * Math.sin(x / 65 + row / 7);
    return `${column === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return points.join(" ");
});

const streams = [
  "M120 85 C145 110 174 108 188 139 S231 170 241 193 S261 228 296 252 L333 287",
  "M364 92 C339 113 345 146 304 160 S265 173 241 193",
  "M64 148 C115 150 126 184 166 185 S209 184 241 193",
  "M400 197 C355 188 326 210 296 252",
];

const stations = [{ x: 120, y: 85 }, { x: 364, y: 92 }, { x: 64, y: 148 }, { x: 400, y: 197 }];

export function WatershedExplorer() {
  const [active, setActive] = useState(0);
  const layer = layers[active];
  const step = featuredWork.pipeline[active];

  return (
    <div className="flex h-full flex-col bg-navy text-navy-foreground">
      <div className="flex items-center justify-between gap-3 px-6 pt-6 sm:px-8">
        <p className="mono-label text-navy-muted">Inside HYDRA</p>
        <span className="mono-label text-navy-accent">Explore the pipeline</span>
      </div>

      <div className="relative overflow-hidden px-3">
        <svg viewBox="0 0 480 320" className="h-auto w-full" role="img" aria-label={`Conceptual watershed: ${layer.caption}`}>
          <g fill="none" stroke="#536c8c" strokeWidth="0.8" opacity="0.55">
            {contours.map((path, index) => <path key={index} d={path} />)}
          </g>
          <g fill="none" stroke={layer.color} strokeLinecap="round" strokeLinejoin="round">
            {streams.map((path, index) => <path key={path} d={path} strokeWidth={index === 0 ? 2.5 : 1.5} opacity={active === 1 ? 1 : 0.65} />)}
          </g>
          <g fill="none" stroke={layer.color} strokeWidth="2" strokeDasharray="3 13" className="watershed-flow">
            <path d={streams[0]} />
          </g>
          {stations.map((station, index) => (
            <g key={index} opacity={active === 0 ? 1 : 0.4}>
              <circle {...{ cx: station.x, cy: station.y }} r="9" fill="#16243a" stroke={layer.color} />
              <circle {...{ cx: station.x, cy: station.y }} r="3" fill={layer.color} />
            </g>
          ))}
          <circle cx="241" cy="193" r={active === 1 ? 18 : 10} fill="#16243a" stroke={layer.color} strokeWidth="2" />
          <path d="M234 193 H248 M241 186 V200" stroke={layer.color} strokeWidth="1.5" />
          <rect x="326" y="280" width="14" height="14" rx="2" fill={active === 2 ? layer.color : "#16243a"} stroke={layer.color} strokeWidth="2" />
          <text x="348" y="292" fill="#b4bfd0" fontSize="11" fontFamily="monospace">OUTLET</text>
        </svg>
        <p className="px-3 pb-4 font-mono text-[0.6875rem] leading-relaxed tracking-wide text-navy-muted sm:px-5">CONCEPTUAL WATERSHED · NOT OBSERVED DATA</p>
      </div>

      <div className="px-6 pb-7 sm:px-8">
        <div className="grid grid-cols-3 gap-1 border-y border-navy-border py-2" role="group" aria-label="Explore HYDRA pipeline stages">
          {layers.map((item, index) => (
            <button
              type="button"
              key={item.label}
              aria-pressed={active === index}
              aria-controls="watershed-stage"
              onClick={() => setActive(index)}
              className={`min-h-11 rounded-sm px-1 focus-visible:outline-navy-accent font-mono text-[0.6875rem] transition-colors sm:text-xs ${active === index ? "bg-navy-foreground text-navy" : "text-navy-muted hover:bg-navy-raised hover:text-navy-foreground"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div id="watershed-stage" aria-live="polite" aria-atomic="true" className="min-h-[10.5rem] pt-5">
          <p className="font-serif text-title text-navy-foreground">{step.title}</p>
          <p className="mt-2 text-body-sm text-navy-muted">{step.body}</p>
        </div>
      </div>
    </div>
  );
}
