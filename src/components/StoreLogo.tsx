import { useState } from "react";
import { useTheme } from "../theme/ThemeContext";
import type { StoreDef } from "../types";

const EXTENSIONS = ["svg", "png", "webp", "jpg"];

export function StoreLogo({ store, size = 28 }: { store: StoreDef; size?: number }) {
  const [extIndex, setExtIndex] = useState(0);
  const { theme } = useTheme();
  const isNight = theme === "night";

  if (extIndex < EXTENSIONS.length) {
    const pad = Math.round(size * 0.15);
    return (
      <span
        className="inline-flex items-center justify-center rounded-md"
        style={{
          backgroundColor: isNight ? "#f5f5f5" : "transparent",
          padding: isNight ? pad : 0,
        }}
      >
        <img
          key={extIndex}
          src={`/logos/${store.id}.${EXTENSIONS[extIndex]}`}
          alt={`${store.label} logo`}
          style={{ height: size, maxWidth: size * 3 }}
          className="object-contain"
          onError={() => setExtIndex((i) => i + 1)}
        />
      </span>
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
