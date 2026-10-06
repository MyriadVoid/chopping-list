import { Library, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { LibraryTab } from "./components/LibraryTab";
import { ManageStoresModal } from "./components/ManageStoresModal";
import { OverflowTabBar } from "./components/OverflowTabBar";
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

const MAX_BOTTOM_STORES = 5;

function AppShell() {
  const [tab, setTab] = useState<TabId>(STORES[0].id);
  const [manageStoresOpen, setManageStoresOpen] = useState(false);
  const { theme } = useTheme();
  const isNight = theme === "night";
  const enabledStoreIds = useListStore((s) => s.enabledStoreIds);

  const activeStore = STORES.find((s) => s.id === tab);
  const visibleStores = STORES.filter((s) => enabledStoreIds.includes(s.id));
  const bottomStores = visibleStores.slice(0, MAX_BOTTOM_STORES);
  const overflowStores = visibleStores.slice(MAX_BOTTOM_STORES);

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
  const isLibraryActive = tab === "library";

  const hasOverflow = overflowStores.length > 0;
  const topTabBar =
    hasOverflow && !isLibraryActive ? (
      <OverflowTabBar stores={overflowStores} active={tab} onChange={setTab} />
    ) : null;

  return (
    <div
      className="flex flex-col h-screen max-w-md mx-auto transition-colors"
      style={{ backgroundColor: bodyBg }}
    >
      <header
        className="flex items-center justify-between gap-2 px-4 py-2 border-b border-slate-200 dark:border-neutral-800 h-14 transition-colors"
        style={{ backgroundColor: chromeBg }}
      >
        <button
          onClick={() => setTab("library")}
          aria-label="Library"
          style={{ color: isLibraryActive ? (isNight ? "#ffffff" : "#18181b") : "#a3a3a3" }}
        >
          <Library size={22} strokeWidth={1.75} />
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setManageStoresOpen(true)}
            aria-label="Add store"
            className="text-slate-500 dark:text-neutral-400"
          >
            <Plus size={22} strokeWidth={1.25} />
          </button>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        {isLibraryActive ? (
          <LibraryTab />
        ) : (
          <StoreTab storeId={tab} topTabBar={topTabBar} />
        )}
      </main>

      <TabBar stores={bottomStores} active={tab} onChange={setTab} />
      {hasOverflow && isLibraryActive && (
        <TabBar stores={overflowStores} active={tab} onChange={setTab} />
      )}

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
