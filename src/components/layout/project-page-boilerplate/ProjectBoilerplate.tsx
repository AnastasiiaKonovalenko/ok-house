import { Box, Grid, IconButton, Typography } from "@mui/material";
import ArrowBack from "@/assets/icons/ArrowBack.tsx";
import { useNavigate } from "react-router";

type Props = {
  header: string;
  text: string;
  imgPath: string;
};

const ProjectBoilerplate = ({ header, text, imgPath }: Props) => {
  const navigate = useNavigate();

  return (
    <Grid
      container
      spacing={{ xs: 3, md: 6 }}
      rowSpacing={{ xs: 1, md: 3 }}
      sx={{
        px: { xs: 6, md: 10 },
        py: { xs: 3, md: 5 }
      }}
      alignItems="start"
    >
      <Grid container size={6}>
        <Grid size={2}>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              p: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowBack size={{ xs: "small", md: "medium", lg: "large" }} />
          </IconButton>
        </Grid>
        <Grid
          size={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
          pr={{ xs: 2, md: 10, lg: 20 }}
          mt={{ xs: 1, md: 2, lg: 5 }}>
          <Typography
            sx={{
              letterSpacing: 2,
              textTransform: "uppercase",
              fontSize: { xs: "2vw", md: "2vw", lg: "32px" } }}
          >
            {header}
          </Typography>
        </Grid>
      </Grid>

      <Grid size={6} />
      <Grid size={{ md: 12, lg: 6 }}>
        <Box
          component="img"
          src={imgPath}
          alt="page img"
          sx={{
            width: "100%",
            display: "block",
            objectFit: "cover",
          }}
        />
      </Grid>
      <Grid alignItems="start" size={{ md: 12, lg: 6 }}>
        <Box
          sx={{
            columnCount: 2,           // количество колонок
            columnGap: "2rem",        // расстояние между ними
            textAlign: "justify",     // красиво выравнивает текст
          }}
        >
          <Typography variant="body1" sx={{ textTransform: "uppercase", fontSize: { xs: "0.5rem", md: "1rem" }}}>
            {text}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProjectBoilerplate;
