import { useListStore } from "../store/useListStore";
import { useTheme } from "../theme/ThemeContext";
import { CHROME_BG_DAY, CHROME_BG_NIGHT, STORES } from "../types";
import { StoreLogo } from "./StoreLogo";

interface ManageStoresModalProps {
  onClose: () => void;
}

export function ManageStoresModal({ onClose }: ManageStoresModalProps) {
  const enabledStoreIds = useListStore((s) => s.enabledStoreIds);
  const setStoreEnabled = useListStore((s) => s.setStoreEnabled);
  const { theme } = useTheme();
  const isNight = theme === "night";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-t-2xl sm:rounded-2xl border border-slate-200 dark:border-neutral-800 overflow-hidden"
        style={{ backgroundColor: isNight ? CHROME_BG_NIGHT : CHROME_BG_DAY }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-neutral-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-neutral-100">
            Manage stores
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 dark:text-neutral-500 text-lg px-1"
          >
            ✕
          </button>
        </div>

        <ul className="divide-y divide-slate-100 dark:divide-neutral-800 max-h-96 overflow-y-auto">
          {STORES.map((store) => {
            const enabled = enabledStoreIds.includes(store.id);
            return (
              <li key={store.id} className="flex items-center gap-3 px-4 py-3">
                <StoreLogo store={store} size={28} />
                <span className="flex-1 text-slate-900 dark:text-neutral-100">{store.label}</span>
                <button
                  onClick={() => setStoreEnabled(store.id, !enabled)}
                  aria-label={enabled ? `Hide ${store.label}` : `Show ${store.label}`}
                  className="relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors"
                  style={{
                    backgroundColor: enabled
                      ? isNight
                        ? "#e5e5e5"
                        : "#18181b"
                      : isNight
                        ? "#404040"
                        : "#d4d4d4",
                  }}
                >
                  <span
                    className="absolute h-5 w-5 rounded-full shadow transition-all"
                    style={{
                      left: enabled ? "calc(100% - 1.375rem)" : "0.125rem",
                      backgroundColor: enabled && isNight ? "#18181b" : "#ffffff",
                    }}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
