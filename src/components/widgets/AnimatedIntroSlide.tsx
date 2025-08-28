import { motion } from "framer-motion";

export default function AnimatedIntroSlide({
  children,
  runIntro,
  idx,
  duration = 1,
}: {
  children: React.ReactNode;
  runIntro: boolean;
  idx: number; // управляем снаружи
  duration?: number;
}) {
  const position: "prev" | "active" | "next" | "other" = idx === 0
    ? "active"
    : idx === 1
      ? "prev"
      : idx === 2
        ? "next"
        : "other";

  if (!runIntro) {
    // после вступления — обычный контент без трансформаций
    return <div style={{ height: "100%" }}>{children}</div>;
  }

  // разные стартовые смещения под роли
  const variants = {
    prev: { x: -800, y: 0, opacity: 0 },
    active: { x: 0, y: -800, opacity: 0 },
    next: { x: 800, y: 0, opacity: 0 },
    other: { x: 800, y: 0, opacity: 0 },
  } as const;

  return (
    <motion.div
      key={`intro-${position}`} // 👈 ремоунт при первой расстановке ролей
      initial={variants[position]}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{ duration, ease: [0.2, 0.8, 0.2, 1] }}
      style={{ height: "100%", willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
