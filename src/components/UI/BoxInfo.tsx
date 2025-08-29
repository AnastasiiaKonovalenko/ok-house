import { Box, SxProps, Theme, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { StyledRouterLink } from "@/components/UI/styled-components/StyledRouterLink.tsx";

type Props = {
  children?: ReactNode;
  header?: string;
  path?: string;
  text?: string;
  imgPath?: string;
  sx?: SxProps<Theme>;
};

const BoxInfo = ({ children, header, text, path, imgPath, sx }: Props) => {
  return (
    <Box
      className="no-swipe" // <- disable Swiper swipe over this area
      sx={{
        overflowY: "hidden",
        boxSizing: "border-box",
        backgroundColor: "rgba(255,255,255,0.9)",
        display: "flex",
        flexDirection: "column",
        minWidth: { xs: "84vw", sm: "25vw" },
        width: { xs: "84vw", sm: "25vw" },
        height: { xs: "84vw", sm: "25vw" },
        p: { xs: "6vw", sm: "3vw" },
        ...(sx ?? {}),
      }}
    >
      {header && (
        <StyledRouterLink to={path ?? ""} aria-label={`Open ${header}`}>
          <Typography
            sx={{
              textTransform: "uppercase",
              pr: { xs: "12vw", sm: "6vw" },
              fontSize: { xs: "1.3rem", md: "1.4rem" },
            }}
          >
            {header}
          </Typography>
        </StyledRouterLink>
      )}
      {text && (
        <Typography
          sx={{
            textTransform: "uppercase",
            lineHeight: { xs: 1.6, md: 1.9 },
            fontSize: { xs: "0.85rem", md: "1rem" },
            pr: { xs: "6vw", sm: "3vw" },
            mt: "6vw",
          }}
        >
          {text}
        </Typography>
      )}
      {imgPath && (
        <Box
          component="img"
          src={imgPath}
          alt="Example"
          sx={{ mt: { xs: "5vw", sm: "2vw" } }}
        />
      )}
      {children}
    </Box>
  );
};

export default BoxInfo;
