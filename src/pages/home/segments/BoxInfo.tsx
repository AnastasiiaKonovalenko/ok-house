// BoxInfo.tsx
import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

type Props = { children: ReactNode, sx?: SxProps<Theme> };

const BoxInfo = ({ children, sx }: Props) => {
  return (
    <Box
      className="no-swipe"                   // <- disable Swiper swipe over this area
      onWheel={(e) => e.stopPropagation()}   // <- block wheel from reaching Swiper
      onPointerDownCapture={(e) => e.stopPropagation()} // blocks drag-start bubbling
      sx={{
        overflowY: "auto",
        overscrollBehaviorY: "contain",      // prevent scroll chaining
        // (your styles)
        boxSizing: "border-box",
        // border: "1px solid #EB95AA",
        backgroundColor: "rgba(255,255,255,0.9)",
        display: "flex",
        flexDirection: "column",
        minWidth: { xs: "84vw", sm: "25vw" },
        width: { xs: "84vw", sm: "25vw" },
        height: { xs: "84vw", sm: "25vw" },
        p: { xs: "6vw", sm: "3vw" },
        pr: { xs: "12vw", sm: "6vw" },
        ...(sx ?? {}),
      }}
    >
      {children}
    </Box>
  );
};

export default BoxInfo;
