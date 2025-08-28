import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";
import HeroHeader from "@/components/layout/HeroHeader";
import ResponsiveBackTextAuto from "@/components/layout/ResponsiveBackTextAuto.tsx";
import { motion } from "framer-motion";

export const backText = {
  textTransform: "uppercase",
  fontFamily: "DarkerGrotesque",
  fontWeight: 300,
  lineHeight: {
    xs: 0.75,   // phones: tight
    sm: 1,  // tablets
    md: 0.6,  // desktop
  },

  // переносы для длинных слов
  wordBreak: "break-word",
  overflowWrap: "anywhere",
  hyphens: "auto",

  // красивое распределение строк (поддержка современными браузерами)
  textWrap: "balance", // CSS property `text-wrap`

  // кегль по брейкпоинтам (на десктопе — как у тебя)
  fontSize: {
    md: "26.8vw",
    sm: "25vw",
    xs: "33vw",
  },

  // управление «длиной строки» в символах: этим задаём,
  // сколько букв помещается в строку => на md/sm/xs получится 3–4 строки
  maxWidth: {
    md: "100%", // на больших: пусть занимает всю ширину, 2 строки ок
    sm: "11ch", // ~11 символов → 3–4 строки
    xs: "9ch", // ~9 символов → 4 строки
  },

  // центрирование и обнуление внешних отступов
  margin: 0,
  mx: "auto",
  textAlign: "center",
};

export type HeaderCtx = {
  setHeaderVisible: (v: boolean) => void;
};

export function HeroLayout() {
  const [headerVisible, setHeaderVisible] = useState(false);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <HeroHeader visible={headerVisible} />

      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            zIndex: -1,
            pointerEvents: "none",
            transition: "opacity 0.3s ease-out",
            opacity: headerVisible ? 1 : 0,
          }}
        >
          <motion.div
            key={headerVisible ? "bg-on" : "bg-off"} // re-mount when becomes visible
            initial={{ opacity: 0 }}
            animate={{ opacity: headerVisible ? 1 : 0 }}
            transition={{ delay: headerVisible ? 0.15 : 0, duration: 0.45, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: -1,
              pointerEvents: "none",
            }}
            aria-hidden
          >
            <ResponsiveBackTextAuto
              xsParts={["pur", "pos", "sibi", "lity"]}
              mdParts={["purpo", "ssibi", "lity"]}
              lgParts={["purpos", "sibility"]}
              sx={backText}
              lang="en"
              timing={{
                xs: { baseDelay: 0.15, step: 0.04, duration: 0.55 },
                md: { baseDelay: 0.18, step: 0.05, duration: 0.6, effect: "blur" },
                lg: { baseDelay: 0.22, step: 0.06, duration: 0.65, effect: "blur" },
              }}
            />
          </motion.div>
        </Box>
        <Outlet context={{ setHeaderVisible } satisfies HeaderCtx} />
      </Box>
    </Box>
  );
}
