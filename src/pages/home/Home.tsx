import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        flex: 1,
        pt: "30vh",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          textTransform: "uppercase",
          mb: 1,
          fontWeight: 300,
          fontFamily: "Comfortaa",
        }}
      >
        {t("common.siteName")}
      </Typography>

      <Typography
        variant="h2"
        sx={{
          textTransform: "uppercase",
          fontWeight: 300,
          fontFamily: "Comfortaa",
        }}
      >
        {t("common.siteSlogan")}
      </Typography>
    </Box>
  );
};

export default Home;
