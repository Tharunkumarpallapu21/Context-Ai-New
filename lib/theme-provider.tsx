import { createContext, useCallback, useContext, useEffect, useMemo } from "react";
import { Appearance, View } from "react-native";
import { colorScheme as nativewindColorScheme, vars } from "nativewind";
import { SchemeColors, type ColorScheme } from "@/constants/theme";
import { useAppStore } from "@/lib/store";

type ThemeContextValue = { colorScheme: ColorScheme; setColorScheme: (scheme: ColorScheme) => void };
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const applyScheme = useCallback((scheme: ColorScheme) => {
    nativewindColorScheme.set(scheme);
    Appearance.setColorScheme?.(scheme);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = scheme;
      document.documentElement.classList.toggle("dark", scheme === "dark");
    }
  }, []);
  useEffect(() => { applyScheme(colorScheme); }, [applyScheme, colorScheme]);
  const setColorScheme = useCallback((scheme: ColorScheme) => { setTheme(scheme); applyScheme(scheme); }, [applyScheme, setTheme]);
  const themeVariables = useMemo(() => vars({ "color-primary": SchemeColors[colorScheme].primary, "color-background": SchemeColors[colorScheme].background, "color-surface": SchemeColors[colorScheme].surface, "color-foreground": SchemeColors[colorScheme].foreground, "color-muted": SchemeColors[colorScheme].muted, "color-border": SchemeColors[colorScheme].border, "color-success": SchemeColors[colorScheme].success, "color-warning": SchemeColors[colorScheme].warning, "color-error": SchemeColors[colorScheme].error }), [colorScheme]);
  return <ThemeContext.Provider value={{ colorScheme, setColorScheme }}><View style={[{ flex: 1 }, themeVariables]}>{children}</View></ThemeContext.Provider>;
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useThemeContext must be used within ThemeProvider");
  return ctx;
}
