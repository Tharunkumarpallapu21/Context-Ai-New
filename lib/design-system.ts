export const APP_COLORS = {
  light: {
    primary: "#175CD3",
    primaryDeep: "#0B3B91",
    accent: "#5B9BFF",
    background: "#F6F8FC",
    surface: "#FFFFFF",
    surfaceAlt: "#EEF4FF",
    foreground: "#0D1B2A",
    text: "#0D1B2A",
    tint: "#175CD3",
    icon: "#607089",
    muted: "#607089",
    border: "#DCE4F0",
    success: "#15803D",
    warning: "#B45309",
    error: "#B42318",
    map: "#DCECF0",
    mapLine: "#FFFFFF",
    mapWater: "#BFDCE6",
  },
  dark: {
    primary: "#7EB1FF",
    primaryDeep: "#B7D2FF",
    accent: "#9AC0FF",
    background: "#08111F",
    surface: "#101C2D",
    surfaceAlt: "#172B49",
    foreground: "#F4F7FC",
    text: "#F4F7FC",
    tint: "#7EB1FF",
    icon: "#A7B5CA",
    muted: "#A7B5CA",
    border: "#263A55",
    success: "#70D49A",
    warning: "#F2BF70",
    error: "#FF9A8A",
    map: "#152A3A",
    mapLine: "#27475A",
    mapWater: "#1A4154",
  },
} as const;

export type AppColorScheme = keyof typeof APP_COLORS;
export type AppColors = (typeof APP_COLORS)[AppColorScheme];

export const SPACE = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 40,
} as const;

export const RADIUS = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const TYPE = {
  display: { fontSize: 30, lineHeight: 36, fontWeight: "700" as const },
  title: { fontSize: 24, lineHeight: 30, fontWeight: "700" as const },
  section: { fontSize: 18, lineHeight: 24, fontWeight: "700" as const },
  body: { fontSize: 16, lineHeight: 24, fontWeight: "400" as const },
  label: { fontSize: 13, lineHeight: 18, fontWeight: "700" as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: "400" as const },
};
