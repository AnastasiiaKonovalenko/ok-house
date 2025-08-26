import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import LogoContainer from "@/components/layout/LogoContainer";

const MT = motion(Box);

export default function AppHeader({ visible }: { visible: boolean }) {
  const { t } = useTranslation();

  return (
    <AppBar
      elevation={0}
      color="transparent"
      sx={{
        zIndex: theme => theme.zIndex.drawer + 1,
        position: "relative",
        px: { xs: 2, sm: 3, md: 6 },
      }}
    >
      <Toolbar
        sx={{
          gap: { xs: 1, sm: 2 },
          minHeight: { xs: 48, sm: 56 },
          py: { xs: 4, sm: 6, md: 12 },
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <MT
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -6 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          sx={{
            fontWeight: 300,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            pointerEvents: "auto",
          }}
        >
          <Box
            component="span"
            sx={{
              "--logo-size": "clamp(40px, 20vw, 140px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: { xs: 0.5, sm: 1 },
              textAlign: "center",
              position: "relative",
              isolation: "isolate", // ← keep blending local
            }}
          >
            {/* Moving logo (below text) */}
            <LogoContainer start={visible} cycles={2} period={1500} size={"var(--logo-size)"} />

            {/* Site name (above, blends against the backdrop) */}
            <Typography
              component="span"
              sx={{
                position: "relative",
                zIndex: 1,
                color: "#000",
                mixBlendMode: "difference",
                fontSize: "calc(var(--logo-size) * 0.16)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                lineHeight: 1.2,
              }}
            >
              {t("common.siteName")}
            </Typography>
          </Box>
        </MT>
      </Toolbar>
    </AppBar>
  );
}
