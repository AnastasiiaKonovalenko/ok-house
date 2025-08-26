// src/features/intro/IntroOverlay.tsx
import * as React from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import SloganMovingLetters from "@/features/intro/SloganMovingLetters";

const MOVE_MS = 650; // задержка перед показом хедера

export default function IntroOverlay({
  onShowHeader, // setHeaderVisible(true)
  onFinish, // убрать интро-оверлей
}: {
  onShowHeader: () => void;
  onFinish: () => void;
}) {
  const reduce = useReducedMotion();
  const { t } = useTranslation();

  const [playOut, setPlayOut] = React.useState(false);

  // без анимаций — сразу показать хедер
  React.useEffect(() => {
    if (!reduce) return;
    onShowHeader();
    onFinish();
  }, [reduce, onShowHeader, onFinish]);

  // запускаем уход слогана через фиксированное время
  React.useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => setPlayOut(true), 1200);
    return () => clearTimeout(id);
  }, [reduce]);

  const handleSloganExitComplete = React.useCallback(() => {
    if (reduce) return;
    // интро уходит
    onFinish();
    // а хедер показываем через MOVE_MS
    setTimeout(onShowHeader, MOVE_MS);
  }, [reduce, onFinish, onShowHeader]);

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
          <SloganMovingLetters
            text={t("common.siteSlogan")}
            variant="h2"
            playOut={playOut}
            onExitComplete={handleSloganExitComplete}
            sx={{ fontWeight: 300, whiteSpace: "nowrap" }}
          />
        </Box>
      </Box>
    </AnimatePresence>
  );
}
