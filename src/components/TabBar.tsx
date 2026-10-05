import { useListStore } from "../store/useListStore";
import { CHROME_BG_DAY, CHROME_BG_NIGHT, STORES, type TabId } from "../types";
import { useTheme } from "../theme/ThemeContext";
import { StoreLogo } from "./StoreLogo";

const LIBRARY_TAB = { id: "library" as const, label: "Library", color: "#404040" };

export function TabBar({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (tab: TabId) => void;
}) {
  const { theme } = useTheme();
  const chromeBg = theme === "night" ? CHROME_BG_NIGHT : CHROME_BG_DAY;
  const enabledStoreIds = useListStore((s) => s.enabledStoreIds);
  const visibleStores = STORES.filter((store) => enabledStoreIds.includes(store.id));
  const TABS = [...visibleStores, LIBRARY_TAB];

  return (
    <nav
      className="flex border-t border-slate-200 dark:border-neutral-800 transition-colors"
      style={{ backgroundColor: chromeBg }}
    >
      {TABS.map((tab) => {
        const isActive = tab.id === active;
        const isStore = tab.id !== "library";
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            aria-label={tab.label}
            className="flex-1 flex flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition-colors"
            style={{
              color: isActive ? tab.color : "#a3a3a3",
              borderTop: isActive ? `2px solid ${tab.color}` : "2px solid transparent",
            }}
          >
            {isStore ? (
              <StoreLogo store={tab} size={30} />
            ) : (
              <>
                <span
                  className="flex items-center justify-center rounded-full"
                  style={{ width: 24, height: 24, fontSize: 16 }}
                >
                  📚
                </span>
                <span>{tab.label}</span>
              </>
            )}
          </button>
        );
      })}
    </nav>
  );
}
