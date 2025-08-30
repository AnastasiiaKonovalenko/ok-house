// ResponsiveBackTextFill.tsx
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { Box, Typography, SxProps, Theme } from "@mui/material";
import { motion } from "framer-motion";

/* ==================== Types ==================== */

export type Effect = "scatter" | "glitch" | "blur";

export type EffectTiming = {
  // Enter
  baseDelay?: number; // seconds: delay per line
  step?: number; // seconds: delay per character
  duration?: number; // seconds: per-character animation duration
  effect?: Effect;
  reverse?: boolean; // right-to-left per-line wave

  // Exit
  exitHold?: number; // seconds to keep text visible before exit starts
};

type PartsByBp = {
  xsParts: string[];
  mdParts: string[];
  lgParts: string[];
};

type Props = PartsByBp & {
  sx?: SxProps<Theme>;
  lang?: string;
  timing?: {
    xs?: EffectTiming;
    md?: EffectTiming;
    lg?: EffectTiming;
  };
  /**
   * When true, the component will play exit AFTER enter finishes.
   * If true from the first render, we wait for enter to complete, then exit.
   */
  out?: boolean;
};

/* ==================== Utilities ==================== */

function prand(i: number) {
  const x = Math.sin(i * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

/** Estimate the ENTER total time (ms) for a given set of lines and timing */
function estimateEnterMs(parts: string[], t?: EffectTiming) {
  const baseDelay = (t?.baseDelay ?? 0.2) * 1000; // per line
  const step = (t?.step ?? 0.05) * 1000; // per character
  const duration = (t?.duration ?? 0.6) * 1000; // per character anim duration

  const lines = parts.length;
  const maxLen = parts.reduce((m, s) => Math.max(m, s.length), 0);

  // last line’s first char starts at (lines-1)*baseDelay
  // within a line, last char adds (maxLen-1)*step
  // add animation duration for that last char
  return Math.max(0, (lines - 1) * baseDelay) + Math.max(0, (maxLen - 1) * step) + duration;
}

/* ==================== Animated Line (per line) ==================== */

const LineGrid = memo(function LineGrid({
  text,
  effect = "scatter",
  baseDelay = 0,
  step = 0.05,
  duration = 0.6,
  reverse = false,
  phase = "enter",
  exitHold = 0,
}: Required<EffectTiming> & { text: string; phase?: "enter" | "exit" }) {
  const chars = text.split("");
  const order = reverse ? [...chars].reverse() : chars;
  const isExit = phase === "exit";

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${text.length}, 1fr)`,
        alignItems: "baseline",
        columnGap: "clamp(0.05em, 0.05vw, 0.3em)",
        width: "100%",
        "@media (prefers-reduced-motion: reduce)": {
          "& *": { animation: "none !important", transition: "none !important" },
        },
      }}
    >
      {order.map((_, i) => {
        const realIndex = reverse ? text.length - 1 - i : i;
        const base = baseDelay + i * step;

        // common “assembled” state
        const enterFinal = { opacity: 1, x: 0, y: 0, filter: "blur(0px)", scale: 1 };

        // helpers for exit targets
        const scatterOff = () => {
          const r = prand(i),
            r2 = prand(i + 17);
          return { opacity: 0, x: (r - 0.5) * 100, y: (r2 - 0.5) * 100, filter: "blur(6px)" };
        };
        const glitchOff = {
          opacity: [1, 0.3, 0],
          y: [0, 0, 12],
          filter: ["blur(0px)", "blur(1px)", "blur(4px)"],
        };
        const blurOff = { opacity: 0, filter: "blur(8px) contrast(180%)", scale: 1.08 };

        let initial: Record<string, any>;
        let animate: Record<string, any>;
        let transition: Record<string, any>;

        if (!isExit) {
          // ===== ENTER
          const baseTransition = { delay: base, duration, ease: "easeOut" as const };
          if (effect === "scatter") {
            const r = prand(i),
              r2 = prand(i + 17);
            initial = { opacity: 0, x: (r - 0.5) * 100, y: (r2 - 0.5) * 100, filter: "blur(6px)" };
            animate = enterFinal;
            transition = baseTransition;
          } else if (effect === "glitch") {
            initial = { opacity: 0, y: 12 };
            animate = {
              opacity: [0, 1, 0.3, 1],
              y: [12, 0, 0, 0],
              filter: ["blur(4px)", "blur(0px)", "blur(1px)", "blur(0px)"],
            };
            transition = { delay: base, duration: duration + 0.2, times: [0, 0.5, 0.7, 1] };
          } else {
            initial = { opacity: 0, filter: "blur(8px) contrast(180%)", scale: 1.08 };
            animate = enterFinal;
            transition = baseTransition;
          }
        } else {
          // ===== EXIT (start already assembled → wait (exitHold) → animate out)
          const baseDelayWithHold = base + exitHold;

          if (effect === "scatter") {
            initial = enterFinal;
            animate = scatterOff();
            transition = { delay: baseDelayWithHold, duration, ease: "easeInOut" };
          } else if (effect === "glitch") {
            initial = enterFinal;
            animate = glitchOff;
            transition = {
              delay: baseDelayWithHold,
              duration: duration + 0.2,
              times: [0, 0.5, 1],
            };
          } else {
            initial = enterFinal;
            animate = blurOff;
            transition = { delay: baseDelayWithHold, duration, ease: "easeInOut" };
          }
        }

        return (
          <motion.span
            key={`${phase}-${realIndex}`}
            initial={initial}
            animate={animate}
            transition={transition}
            style={{
              display: "inline-block",
              justifySelf: "center",
              whiteSpace: "pre",
              willChange: "transform, filter, opacity",
            }}
          >
            {text[realIndex]}
          </motion.span>
        );
      })}
    </Box>
  );
});

/* ==================== Section by Breakpoint ==================== */

function Section({
  parts,
  showOn,
  sx,
  timing,
  lang,
  rowGap,
  phase,
}: {
  parts: string[];
  showOn: Record<string, "none" | "block">;
  sx?: SxProps<Theme>;
  timing: EffectTiming;
  lang: string;
  rowGap: string;
  phase: "enter" | "exit";
}) {
  const {
    baseDelay = 0.2,
    step = 0.05,
    duration = 0.6,
    effect = "scatter",
    reverse = false,
    exitHold = 0,
  } = timing;

  return (
    <Typography component="div" lang={lang} sx={{ ...sx, display: showOn, height: "100%" }}>
      <Box
        sx={{
          height: "100%",
          display: "grid",
          gridTemplateRows: `repeat(${parts.length}, 1fr)`,
          rowGap,
          alignItems: "center",
          justifyItems: "stretch",
        }}
      >
        {parts.map((line, i) => (
          <LineGrid
            key={`${phase}-${i}`}
            text={line}
            baseDelay={i * baseDelay}
            step={step}
            duration={duration}
            effect={effect}
            reverse={reverse}
            phase={phase}
            exitHold={exitHold}
          />
        ))}
      </Box>
    </Typography>
  );
}

/* ==================== Main Component ==================== */

export default function ResponsiveBackTextFill({
  xsParts,
  mdParts,
  lgParts,
  sx,
  lang = "en",
  timing,
  out = false,
}: Props) {
  // We always play ENTER first, then EXIT if `out` is true (now or later)
  const [phase, setPhase] = useState<"enter" | "exit">("enter");
  const hasScheduledExitRef = useRef(false);

  // Compute an estimated "enter time" (ms) across all breakpoints;
  // take the maximum to be safe no matter which BP is active.
  const enterEstimateMs = useMemo(() => {
    const xsMs = estimateEnterMs(xsParts, timing?.xs);
    const mdMs = estimateEnterMs(mdParts, timing?.md);
    const lgMs = estimateEnterMs(lgParts, timing?.lg);
    return Math.max(xsMs, mdMs, lgMs);
  }, [xsParts, mdParts, lgParts, timing]);

  // If `out` is true at mount or later, switch to exit AFTER enter finishes.
  useEffect(() => {
    if (!out) return;

    // prevent scheduling multiple times
    if (hasScheduledExitRef.current) return;
    hasScheduledExitRef.current = true;

    const id = window.setTimeout(() => {
      setPhase("exit");
    }, enterEstimateMs);

    return () => window.clearTimeout(id);
  }, [out, enterEstimateMs]);

  return (
    <Box sx={{ px: { xs: 1, sm: 2, md: 5 }, boxSizing: "border-box" }}>
      {/* xs */}
      <Section
        parts={xsParts}
        showOn={{ xs: "block", sm: "none" }}
        sx={sx}
        lang={lang}
        rowGap={"clamp(0.1em, 1.5vh, 0.6em)"}
        timing={{
          baseDelay: 0.2,
          step: 0.05,
          duration: 0.6,
          effect: "scatter",
          exitHold: timing?.xs?.exitHold ?? 0,
          ...(timing?.xs || {}),
        }}
        phase={phase}
      />

      {/* sm–md */}
      <Section
        parts={mdParts}
        showOn={{ xs: "none", sm: "block", lg: "none" }}
        sx={sx}
        lang={lang}
        rowGap={"clamp(0.1em, 1.3vh, 0.6em)"}
        timing={{
          baseDelay: 0.2,
          step: 0.05,
          duration: 0.6,
          effect: "scatter",
          exitHold: timing?.md?.exitHold ?? 0,
          ...(timing?.md || {}),
        }}
        phase={phase}
      />

      {/* lg+ */}
      <Section
        parts={lgParts}
        showOn={{ xs: "none", lg: "block" }}
        sx={sx}
        lang={lang}
        rowGap={"clamp(0.1em, 1vh, 0.5em)"}
        timing={{
          baseDelay: 0.2,
          step: 0.05,
          duration: 0.6,
          effect: "scatter",
          exitHold: timing?.lg?.exitHold ?? 0,
          ...(timing?.lg || {}),
        }}
        phase={phase}
      />
    </Box>
  );
}
