import './i18n'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { theme } from "@/theme/theme.ts";
import { router } from "@/router/router.tsx";
import "@/styles/fonts.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <GlobalStyles
        styles={{
          html: { height: "100%" },
          body: { height: "100%" },
          "#root": { height: "100%" },
        }}
      />
    <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
