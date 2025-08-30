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
      spacing={{ xs: 1, md: 6 }}
      rowSpacing={{ xs: 1, md: 2 }}
      sx={{
        px: { xs: 6, md: 10 },
        py: { xs: 2, md: 4 }
      }}
      alignItems="start"
    >
        <Grid
          height={{xs: 32, md: 64, lg: 75}}
          position="relative"
          size={{ xs: 12, lg: 6 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                p: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowBack size={{ xs: "small", md: "medium", lg: "large" }} />
            </IconButton>
          <Typography
            sx={{
              letterSpacing: 2,
              textTransform: "uppercase",
              fontSize: { xs: "2vw", md: "2vw", lg: "28px" } }}
          >
            {header}
          </Typography>
        </Grid>

      <Grid size={{ xs: 0, lg: 6}}  />
      <Grid size={{ xs: 12, lg: 6 }}>
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
      <Grid alignItems="flex-start" size={{ md: 12, lg: 6 }}>
        <Box
          sx={{
            columnCount: 2,
            columnGap: { md: "1rem", lg: "2rem" },
            columnFill: "balance",          // ⬅️ balance column heights
          }}
        >
          <Typography
            component="div"
            variant="body1"
            lang="en"
            sx={{
              textTransform: "uppercase",
              fontSize: { xs: "0.5rem", md: "1rem" },
              lineHeight: { xs: 1.35, md: 1.5 },  // ⬅️ slightly tighter lines helps justify
              hyphens: "auto",
              overflowWrap: "anywhere",
              wordBreak: 'break-word',
              textAlignLast: "start",
              textWrap: "balance",
              textRendering: "optimizeLegibility", // ⬅️ nicer kerning/ligatures where supported
            }}
          >
            {text}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProjectBoilerplate;
