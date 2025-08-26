import { Outlet, useNavigation } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";
import HeroHeader from "@/components/layout/HeroHeader";

export type HeaderCtx = {
  setHeaderVisible: (v: boolean) => void;
};

export function HeroLayout() {
  const busy = useNavigation().state !== "idle";
  const [headerVisible, setHeaderVisible] = useState(false);

  return (
    <Box sx={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <HeroHeader visible={headerVisible} />

      <Box component="main" sx={{ display: "flex", flexDirection: "column", flexGrow: 1, overflow: "hidden" }}>
        {busy && <Box sx={{ p: 1 }}>Loading…</Box>}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <Outlet context={{ setHeaderVisible } satisfies HeaderCtx} />
        </Box>
      </Box>
    </Box>
  );
}
