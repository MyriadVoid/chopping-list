import { CHROME_BG_DAY, CHROME_BG_NIGHT, type StoreDef, type TabId } from "../types";
import { useTheme } from "../theme/ThemeContext";
import { StoreLogo } from "./StoreLogo";

export function OverflowTabBar({
  stores,
  active,
  onChange,
}: {
  stores: StoreDef[];
  active: TabId;
  onChange: (tab: TabId) => void;
}) {
  const { theme } = useTheme();
  const chromeBg = theme === "night" ? CHROME_BG_NIGHT : CHROME_BG_DAY;

  if (stores.length === 0) return null;

  return (
    <nav
      className="flex border-b border-slate-200 dark:border-neutral-800 transition-colors"
      style={{ backgroundColor: chromeBg }}
    >
      {stores.map((store) => {
        const isActive = store.id === active;
        return (
          <button
            key={store.id}
            onClick={() => onChange(store.id)}
            aria-label={store.label}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors"
            style={{
              color: isActive ? store.color : "#a3a3a3",
              borderBottom: isActive ? `2px solid ${store.color}` : "2px solid transparent",
            }}
          >
            <StoreLogo store={store} size={30} />
          </button>
        );
      })}
    </nav>
  );
}
