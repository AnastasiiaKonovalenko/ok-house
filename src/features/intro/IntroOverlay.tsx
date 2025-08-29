import * as React from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import ResponsiveBackTextAuto from "@/components/layout/ResponsiveBackTextAuto.tsx";

const MOVE_MS = 600;

type Timing = {
  baseDelay?: number;
  step?: number;
  duration?: number;
  exitHold?: number;
};

function estimatePhaseMs(parts: string[], t: Timing) {
  const baseDelay = (t.baseDelay ?? 0.2) * 1000; // per-line stagger
  const step = (t.step ?? 0.05) * 1000; // per-letter stagger
  const duration = (t.duration ?? 0.6) * 1000; // anim dur for a char
  const exitHold = (t.exitHold ?? 0) * 1000;

  const lines = parts.length || 1;
  const maxLen = parts.reduce((m, s) => Math.max(m, s.length), 0) || 1;

  // Last line starts at (lines - 1) * baseDelay
  // Last char starts at (maxLen - 1) * step
  // Then add duration of that last char.
  return (lines - 1) * baseDelay + (maxLen - 1) * step + duration + exitHold;
}

export default function IntroOverlay({
  onShowHeader, // setHeaderVisible(true)
  onFinish, // убрать интро-оверлей
}: {
  onShowHeader: () => void;
  onFinish: () => void;
}) {
  const reduce = useReducedMotion();
  const { t } = useTranslation();
  const text = t("common.siteSlogan");

  // configure your animation timings here (per breakpoint)
  const timing = useMemo(
    () => ({
      xs: { baseDelay: 0.15, step: 0.04, duration: 0.55, exitHold: 0.2 },
      md: { baseDelay: 0.18, step: 0.05, duration: 0.6, exitHold: 0.25 },
      lg: { baseDelay: 0.22, step: 0.06, duration: 0.65, exitHold: 0.3 },
    }),
    []
  );

  // We use a single-line layout for all breakpoints here.
  const xsParts = useMemo(() => [text], [text]);
  const mdParts = xsParts;
  const lgParts = xsParts;

  const [out, setOut] = useState(false);
  const finishScheduledRef = useRef(false);

  // Accessibility: skip animation
  useEffect(() => {
    if (!reduce) return;
    onShowHeader();
    onFinish();
  }, [reduce, onShowHeader, onFinish]);

  // Trigger exit shortly after enter starts (adjust this hold to taste)
  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => setOut(true), 1200); // when to start exiting
    return () => clearTimeout(id);
  }, [reduce]);

  // Schedule finish after exit completes (rough estimate across BPs)
  useEffect(() => {
    if (reduce || !out || finishScheduledRef.current) return;

    finishScheduledRef.current = true;

    // Estimate the longest total "enter (already passed) + exit" we need.
    // We only need to estimate EXIT now (since we trigger this after out=true),
    // but to be safe across breakpoints, compute the maximum.
    const xsExitMs = estimatePhaseMs(xsParts, timing.xs);
    const mdExitMs = estimatePhaseMs(mdParts, timing.md);
    const lgExitMs = estimatePhaseMs(lgParts, timing.lg);
    const maxExitMs = Math.max(xsExitMs, mdExitMs, lgExitMs);

    const id = window.setTimeout(() => {
      onFinish(); // hide overlay
      window.setTimeout(onShowHeader, MOVE_MS); // then reveal header
    }, maxExitMs);

    return () => window.clearTimeout(id);
  }, [out, reduce, onFinish, onShowHeader, xsParts, mdParts, lgParts, timing]);

  return (
    <AnimatePresence>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: reduce ? 0 : 0.4 } }}
        exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.35 } }}
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "#fff",
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "30vh",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <ResponsiveBackTextAuto
            xsParts={xsParts}
            mdParts={mdParts}
            lgParts={lgParts}
            lang="en"
            timing={timing}
            out={out}
            sx={{
              textTransform: "uppercase",
            }}
          />
        </Box>
      </Box>
    </AnimatePresence>
  );
}
