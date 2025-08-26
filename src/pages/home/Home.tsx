import { Box } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import IntroOverlay from "@/features/intro/IntroOverlay";
import { HeaderCtx } from "@/components/layout/HeroLayout.tsx";
import { useState } from "react";

export default function Home() {
  const { setHeaderVisible } = useOutletContext<HeaderCtx>();
  const [showIntro, setShowIntro] = useState(true);

  return (
    <Box sx={{ minHeight: "100dvh" }}>
      {showIntro && (
        <IntroOverlay
          onShowHeader={() => setHeaderVisible(true)}
          onFinish={() => setShowIntro(false)}
        />
      )}

      {/* основной контент страницы */}
    </Box>
  );
}
