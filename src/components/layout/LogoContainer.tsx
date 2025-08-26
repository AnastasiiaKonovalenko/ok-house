import { useEffect, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";

type Props = {
  start?: boolean;
  cycles?: number;
  period?: number;
  ampY?: number;
  ampR?: number;
  delayMs?: number;
  size?: number | string; // e.g. "clamp(40px, 20vw, 140px)"
};

const LogoContainer = ({
  start = false,
  cycles = 3,
  period = 1500,
  ampY = 15,
  ampR = 6,
  delayMs = 0,
  size = "clamp(40px, 20vw, 140px)",
}: Props) => {
  const y = useMotionValue(0);
  const rotate = useMotionValue(0);

  const t0 = useRef<number | null>(null);
  const done = useRef(false);

  useEffect(() => {
    t0.current = null;
    done.current = false;
    y.set(0);
    rotate.set(0);
  }, [start, y, rotate]);

  useAnimationFrame(t => {
    if (!start || done.current) return;

    if (t0.current === null) t0.current = t + delayMs;

    const elapsed = t - t0.current;
    if (elapsed < 0) return;

    const total = cycles * period;
    const clamped = Math.min(elapsed, total);
    const x = clamped / total;
    const omega = (2 * Math.PI) / period;
    const env = (1 - x) * (1 - x);

    const yVal = Math.sin(clamped * omega) * ampY * env;
    const rVal = Math.cos(clamped * omega) * ampR * env;

    y.set(yVal);
    rotate.set(rVal);

    if (elapsed >= total) {
      y.set(0);
      rotate.set(0);
      done.current = true;
    }
  });

  return (
    <motion.img
      src="/logo.svg"
      alt="Site logo"
      style={{
        y,
        rotate,
        display: "block",
        transformOrigin: "50% 60%",
        width: typeof size === "number" ? `${size}px` : size,
        height: "auto",
      }}
    />
  );
};

export default LogoContainer;
