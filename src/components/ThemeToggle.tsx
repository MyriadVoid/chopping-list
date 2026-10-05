import { useTheme } from "../theme/ThemeContext";

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="#f59e0b" strokeWidth={2} strokeLinecap="round">
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" width={13} height={13} fill="#404040">
      <path d="M20.6 15.2a9 9 0 1 1-11.8-11.8 7.2 7.2 0 0 0 11.8 11.8Z" />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isNight = theme === "night";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isNight ? "Switch to day mode" : "Switch to night mode"}
      className="relative inline-flex h-7 w-14 shrink-0 items-center rounded-full transition-colors"
      style={{ backgroundColor: isNight ? "#171717" : "#e5e5e5" }}
    >
      <span
        className="absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition-all"
        style={{ left: isNight ? "calc(100% - 1.625rem)" : "0.125rem" }}
      >
        {isNight ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
