import { Box, SxProps, Theme } from "@mui/material";

type SvgSize = "small" | "medium" | "large";
type ResponsiveSize = Partial<Record<"xs" | "sm" | "md" | "lg" | "xl", SvgSize>>;

type ArrowIconProps = {
  size?: SvgSize | ResponsiveSize;
  sx?: SxProps<Theme>;
};

const SIZE_MAP: Record<SvgSize, number> = {
  small: 32,
  medium: 64,
  large: 75,
};

export function ArrowBack({ size = "medium", sx }: ArrowIconProps) {
  const responsiveSize =
    typeof size === "string"
      ? SIZE_MAP[size]
      : Object.fromEntries(
        Object.entries(size).map(([bp, s]) => [bp, s ? SIZE_MAP[s] : undefined])
      );

  return (
    <Box
      component="svg"
      viewBox="0 0 113 113"
      sx={{
        width: responsiveSize,
        height: responsiveSize,
        display: "block",
        ...sx,
      }}
    >
      <circle cx="56.5" cy="56.5" r="56.5" transform="rotate(180 56.5 56.5)" fill="#EB95AA" />
      <path
        d="M56 76.8333C44.494 76.8333 35.1666 67.5059 35.1666 56C35.1666 44.494 44.494 35.1666 56 35.1666C67.5059 35.1666 76.8333 44.494 76.8333 56C76.8207 67.5006 67.5007 76.8207 56 76.8333ZM56 39.3333C46.8445 39.3356 39.4051 46.7226 39.338 55.8778C39.2708 65.0329 46.6012 72.5282 55.7556 72.6648C64.91 72.8013 72.4606 65.5281 72.6666 56.375L72.6666 60.0895L72.6666 56C72.6563 46.7995 65.2004 39.3436 56 39.3333ZM59.0208 66.2083L48.7083 55.8958L59.0208 45.5833L61.9666 48.5291L54.6 55.8958L61.9645 63.2625L59.0229 66.2083L59.0208 66.2083Z"
        fill="white"
      />
    </Box>
  );
}

export default ArrowBack;
