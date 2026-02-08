import { Platform } from "react-native";

export const fonts = {
  serif: Platform.select({ ios: "Georgia", android: "serif" }),
  sans: Platform.select({ ios: "System", android: "Roboto" }),
};

export const colors = {
  background: "#FAF9F6",
  ink: "#000000",
};

export const opacity = {
  full: 0.9,
  medium: 0.6,
  light: 0.4,
  subtle: 0.2,
  border: 0.08,
};

export const ink = (opacity: number) => `rgba(0,0,0,${opacity})`;

export const fontSize = {
  writing: 24,
  body: 16,
  label: 13,
  ui: 14,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
