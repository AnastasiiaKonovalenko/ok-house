// LineGrid.tsx
import { Box } from "@mui/material";

export function LineGrid({ text }: { text: string }) {
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
