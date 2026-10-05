import { Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { LibraryTab } from "./components/LibraryTab";
import { ManageStoresModal } from "./components/ManageStoresModal";
import { StoreLogo } from "./components/StoreLogo";
import { StoreTab } from "./components/StoreTab";
import { TabBar } from "./components/TabBar";
import { ThemeToggle } from "./components/ThemeToggle";
import { useListStore } from "./store/useListStore";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";
import {
  CHROME_BG_DAY,
  CHROME_BG_NIGHT,
  LIBRARY_BG_DAY,
  LIBRARY_BG_NIGHT,
  STORES,
  type TabId,
} from "./types";

function AppShell() {
  const [tab, setTab] = useState<TabId>(STORES[0].id);
  const [manageStoresOpen, setManageStoresOpen] = useState(false);
  const { theme } = useTheme();
  const isNight = theme === "night";
  const enabledStoreIds = useListStore((s) => s.enabledStoreIds);

  const activeStore = STORES.find((s) => s.id === tab);

  useEffect(() => {
    if (activeStore && !enabledStoreIds.includes(activeStore.id)) {
      const firstEnabled = STORES.find((s) => enabledStoreIds.includes(s.id));
      setTab(firstEnabled ? firstEnabled.id : "library");
    }
  }, [activeStore, enabledStoreIds]);

  const bodyBg = activeStore
    ? isNight
      ? activeStore.bgNight
      : activeStore.bgDay
    : isNight
      ? LIBRARY_BG_NIGHT
      : LIBRARY_BG_DAY;
  const chromeBg = isNight ? CHROME_BG_NIGHT : CHROME_BG_DAY;

  return (
    <div
      className="flex flex-col h-screen max-w-md mx-auto transition-colors"
      style={{ backgroundColor: bodyBg }}
    >
      <header
        className="flex items-center justify-between gap-2 px-4 py-2 border-b border-slate-200 dark:border-neutral-800 h-14 transition-colors"
        style={{ backgroundColor: chromeBg }}
      >
        {activeStore ? (
          <StoreLogo store={activeStore} size={32} />
        ) : (
          <h1 className="text-lg font-semibold text-slate-900 dark:text-neutral-100">Library</h1>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setManageStoresOpen(true)}
            aria-label="Manage stores"
            className="text-slate-500 dark:text-neutral-400"
          >
            <Settings size={20} strokeWidth={1.75} />
          </button>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {tab === "library" ? <LibraryTab /> : <StoreTab storeId={tab} />}
      </main>

      <TabBar active={tab} onChange={setTab} />

      {manageStoresOpen && <ManageStoresModal onClose={() => setManageStoresOpen(false)} />}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}

export default App;
