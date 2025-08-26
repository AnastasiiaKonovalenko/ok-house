// ResponsiveBackTextFill.tsx
import { Typography, Box } from "@mui/material";

function LineGrid({ text }: { text: string }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${text.length}, 1fr)`,
        alignItems: "baseline",
        columnGap: "clamp(0.05em, 1vw, 0.3em)",
        width: "100%",
      }}
    >
      {text.split("").map((ch, i) => (
        <span key={i} style={{ justifySelf: "center" }}>{ch}</span>
      ))}
    </Box>
  );
}

type Props = {
  xsParts: string[];
  mdParts: string[];
  lgParts: string[];
  sx?: any;      // ваш style.backText
  lang?: string;
};

export default function ResponsiveBackTextFill({
                                                 xsParts, mdParts, lgParts, sx, lang = "en",
                                               }: Props) {
  return (
    <Box sx={{ px: { xs: 1, sm: 2, md: 5 } }}>
      {/* xs */}
      <Typography
        component="div"
        lang={lang}
        sx={{
          ...sx,
          display: { xs: "block", sm: "none" },
          height: "100%",                 // растягиваемся на всю высоту
          displayPrint: "block",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "grid",
            gridTemplateRows: `repeat(${xsParts.length}, 1fr)`, // равные доли по высоте
            rowGap: "clamp(0.1em, 1.5vh, 0.6em)",               // контролируемый вертикальный зазор
            alignItems: "center",
            justifyItems: "stretch",
          }}
        >
          {xsParts.map((line, i) => (
            <LineGrid key={`xs-${i}`} text={line} />
          ))}
        </Box>
      </Typography>

      {/* sm–md */}
      <Typography
        component="div"
        lang={lang}
        sx={{
          ...sx,
          display: { xs: "none", sm: "block", lg: "none" },
          height: "100%",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "grid",
            gridTemplateRows: `repeat(${mdParts.length}, 1fr)`,
            rowGap: "clamp(0.1em, 1.3vh, 0.6em)",
            alignItems: "center",
            justifyItems: "stretch",
          }}
        >
          {mdParts.map((line, i) => (
            <LineGrid key={`md-${i}`} text={line} />
          ))}
        </Box>
      </Typography>

      {/* lg+ */}
      <Typography
        component="div"
        lang={lang}
        sx={{
          ...sx,
          display: { xs: "none", lg: "block" },
          height: "100%",
        }}
      >
        <Box
          sx={{
            height: "100%",
            display: "grid",
            gridTemplateRows: `repeat(${lgParts.length}, 1fr)`,
            rowGap: "clamp(0.1em, 1vh, 0.5em)",
            alignItems: "center",
            justifyItems: "stretch",
          }}
        >
          {lgParts.map((line, i) => (
            <LineGrid key={`lg-${i}`} text={line} />
          ))}
        </Box>
      </Typography>
    </Box>
  );
}
