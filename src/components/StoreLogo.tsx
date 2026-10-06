import { useEffect, useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import type { StoreDef } from "../types";

const EXTENSIONS = ["svg", "png", "webp", "jpg"];

type Mode = "dark" | "normal" | "fallback";

export function StoreLogo({ store, size = 28 }: { store: StoreDef; size?: number }) {
  const { theme } = useTheme();
  const isNight = theme === "night";
  const [mode, setMode] = useState<Mode>(isNight ? "dark" : "normal");
  const [extIndex, setExtIndex] = useState(0);

  useEffect(() => {
    setMode(isNight ? "dark" : "normal");
    setExtIndex(0);
  }, [isNight, store.id]);

  function handleError() {
    if (extIndex < EXTENSIONS.length - 1) {
      setExtIndex((i) => i + 1);
      return;
    }
    if (mode === "dark") {
      setMode("normal");
      setExtIndex(0);
    } else {
      setMode("fallback");
    }
  }

  if (mode !== "fallback") {
    const suffix = mode === "dark" ? "-dark" : "";
    return (
      <img
        key={`${mode}-${extIndex}`}
        src={`/logos/${store.id}${suffix}.${EXTENSIONS[extIndex]}`}
        alt={`${store.label} logo`}
        style={{ height: size, maxWidth: size * 3 }}
        className="object-contain"
        onError={handleError}
      />
    );
  }

  return (
    <span
      style={{
        backgroundColor: store.color,
        width: size,
        height: size,
        fontSize: size * 0.5,
      }}
      className="rounded-full flex items-center justify-center text-white font-bold shrink-0"
    >
      {store.label[0]}
    </span>
  );
}
