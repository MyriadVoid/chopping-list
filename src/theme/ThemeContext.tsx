import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "day" | "night";

const STORAGE_KEY = "chopping-list-theme";

function getInitialTheme(): Theme {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  const theme = stored === "night" ? "night" : "day";
  // Applied synchronously (before first paint) to avoid a flash of the wrong theme.
  document.documentElement.classList.toggle("dark", theme === "night");
  return theme;
}

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.classList.toggle("dark", theme === "night");
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "day" ? "night" : "day"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
