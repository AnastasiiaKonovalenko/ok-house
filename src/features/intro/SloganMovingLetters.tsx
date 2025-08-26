// src/features/intro/SloganMovingLetters.tsx
import * as React from "react";
import { Typography, type TypographyProps } from "@mui/material";
import { motion, type Variants, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  variant?: TypographyProps["variant"];
  playOut?: boolean;             // manual control: start exit phase
  autoPlayOut?: boolean;         // if true, exit starts automatically when entry finishes
  delayIn?: number;              // group delay before letters enter (sec)
  durationIn?: number;           // per-letter in duration (sec)
  durationOut?: number;          // per-letter out duration (sec)
  stagger?: number;              // delay between letters (sec)
  onExitComplete?: () => void;   // callback when exit finishes
  sx?: TypographyProps["sx"];
};

// Approximations of expo easings for Framer tuples:
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_IN_EXPO  = [0.7, 0, 0.84, 0] as const;

const Group = motion.div;
const Letter = motion.span;

export default function SloganMovingLetters({
                                              text,
                                              variant = "h2",
                                              playOut: playOutProp,
                                              autoPlayOut = false,
                                              delayIn = 0.3,
                                              durationIn = 1.4,
                                              durationOut = 1.2,
                                              stagger = 0.03,
                                              onExitComplete,
                                              sx,
                                            }: Props) {
  const reduce = useReducedMotion();

  // keep spaces intact
  const letters = React.useMemo(
    () => Array.from(text).map((ch, i) => ({ key: `${i}-${ch}`, char: ch === " " ? "\u00A0" : ch })),
    [text]
  );

  // Local control when autoPlayOut is enabled
  const [autoExit, setAutoExit] = React.useState(false);
  const playOut = playOutProp ?? autoExit;

  // If asked, trigger exit exactly when entry has finished for all letters
  React.useEffect(() => {
    if (!autoPlayOut || reduce) return;
    const n = letters.length;
    // total entry duration (sec) = delayIn + durationIn + (n-1)*stagger
    const totalInSec = delayIn + durationIn + Math.max(0, n - 1) * stagger;
    const id = setTimeout(() => setAutoExit(true), totalInSec * 1000);
    return () => clearTimeout(id);
  }, [autoPlayOut, reduce, letters.length, delayIn, durationIn, stagger]);

  // Parent: controls only staggering
  const groupVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduce ? 0 : delayIn,
        staggerChildren: reduce ? 0 : stagger,
      },
    },
    exit: {
      transition: {
        staggerChildren: reduce ? 0 : stagger,
        staggerDirection: -1, // finish with the first character
      },
    },
  };

  // Per-letter motion
  const letterVariants: Variants = {
    hidden: { y: reduce ? 0 : 100, opacity: reduce ? 1 : 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: reduce ? 0 : durationIn, ease: EASE_OUT_EXPO },
    },
    exit: {
      y: reduce ? 0 : -100,
      opacity: reduce ? 1 : 0,
      transition: { duration: reduce ? 0 : durationOut, ease: EASE_IN_EXPO },
    },
  };

  // With staggerDirection:-1, the first letter (index 0) completes last
  const handleLetterComplete = (index: number) => {
    if (playOut && index === 0 && onExitComplete) onExitComplete();
  };

  return (
    <Group
      initial="hidden"
      animate={playOut ? "exit" : "visible"}
      variants={groupVariants}
      style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
    >
      <Typography
        variant={variant}
        sx={{
          display: "inline-block",
          textTransform: "uppercase",
          fontWeight: 300,
          letterSpacing: "0.02em",
          lineHeight: 1,
          // Responsive font size (tweak as you like)
          fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem", lg: "4rem" },
          px: { xs: 1, sm: 0 },
          ...sx,
        }}
      >
        {letters.map((l, i) => (
          <Letter
            key={l.key}
            variants={letterVariants}
            style={{ display: "inline-block", lineHeight: "1em" }}
            onAnimationComplete={() => handleLetterComplete(i)}
          >
            {l.char}
          </Letter>
        ))}
      </Typography>
    </Group>
  );
}
