import { Plus } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useListStore } from "../store/useListStore";
import { useTheme } from "../theme/ThemeContext";
import { buildCategoryList, CHROME_BG_DAY, CHROME_BG_NIGHT } from "../types";
import { CategorySection } from "./CategorySection";
import { LibraryItemRow } from "./LibraryItemRow";
import { LibraryAddBar } from "./LibraryAddBar";

type SortMode = "category" | "alphabetical";

export function LibraryTab({ topTabBar }: { topTabBar?: ReactNode }) {
  const libraryItems = useListStore((s) => s.libraryItems);
  const addLibraryItem = useListStore((s) => s.addLibraryItem);
  const toggleLibraryItemFavorite = useListStore((s) => s.toggleLibraryItemFavorite);
  const deleteLibraryItem = useListStore((s) => s.deleteLibraryItem);
  const sendLibraryItemToStore = useListStore((s) => s.sendLibraryItemToStore);
  const customCategories = useListStore((s) => s.customCategories);
  const addCustomCategory = useListStore((s) => s.addCustomCategory);

  const [sortMode, setSortMode] = useState<SortMode>("category");
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const { theme } = useTheme();
  const isNight = theme === "night";

  const allCategories = buildCategoryList(customCategories);

  const alphabetical = [...libraryItems].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );

  const alphabeticalGroups: { letter: string; items: typeof alphabetical }[] = [];
  for (const item of alphabetical) {
    const letter = item.name.charAt(0).toUpperCase();
    const currentGroup = alphabeticalGroups[alphabeticalGroups.length - 1];
    if (currentGroup && currentGroup.letter === letter) {
      currentGroup.items.push(item);
    } else {
      alphabeticalGroups.push({ letter, items: [item] });
    }
  }

  function submitNewCategory() {
    if (!newCategoryName.trim()) return;
    addCustomCategory(newCategoryName);
    setNewCategoryName("");
    setAddingCategory(false);
  }

  return (
    <div className="flex flex-col h-full">
      <LibraryAddBar onAdd={addLibraryItem} />
      {topTabBar}

      <div
        className="flex gap-1 p-1 mx-3 mt-3 rounded-lg"
        style={{ backgroundColor: isNight ? "#262626" : "#e5e5e5" }}
      >
        {(
          [
            { id: "category" as const, label: "By category" },
            { id: "alphabetical" as const, label: "A–Z" },
          ]
        ).map((option) => {
          const isActive = sortMode === option.id;
          return (
            <button
              key={option.id}
              onClick={() => setSortMode(option.id)}
              className="flex-1 rounded-md py-1.5 text-sm font-medium transition-colors"
              style={
                isActive
                  ? {
                      backgroundColor: isNight ? CHROME_BG_NIGHT : CHROME_BG_DAY,
                      color: isNight ? "#f5f5f5" : "#18181b",
                    }
                  : { color: isNight ? "#a3a3a3" : "#737373" }
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto mt-2">
        {sortMode === "category" ? (
          <>
            {allCategories.map((category) => (
              <CategorySection
                key={category.id}
                category={category}
                items={libraryItems.filter(
                  (item) => (item.categoryId ?? "other") === category.id
                )}
                onToggleFavorite={toggleLibraryItemFavorite}
                onDelete={deleteLibraryItem}
                onSendToStore={sendLibraryItemToStore}
              />
            ))}

            {addingCategory ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitNewCategory();
                }}
                className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 dark:border-neutral-800"
              >
                <input
                  autoFocus
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Category name…"
                  className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-lg border px-3 py-2 text-sm font-medium"
                  style={
                    isNight
                      ? { backgroundColor: "#000000", color: "#ffffff", borderColor: "#525252" }
                      : { backgroundColor: "#d4d4d8", color: "#18181b", borderColor: "#d4d4d8" }
                  }
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddingCategory(false);
                    setNewCategoryName("");
                  }}
                  className="shrink-0 text-slate-400 dark:text-neutral-500 text-sm px-1"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                onClick={() => setAddingCategory(true)}
                className="w-full flex items-center gap-2 px-4 py-3 text-left text-slate-500 dark:text-neutral-400"
              >
                <Plus size={18} strokeWidth={1.75} className="shrink-0" />
                Add a category
              </button>
            )}
          </>
        ) : alphabetical.length === 0 ? (
          <p className="p-6 text-center text-slate-400 dark:text-neutral-500">
            No ingredients planned yet.
          </p>
        ) : (
          alphabeticalGroups.map((group) => (
            <div key={group.letter}>
              <div
                className="px-4 py-1 text-xl font-bold"
                style={{
                  backgroundColor: isNight ? "#262626" : "#e5e5e5",
                  color: isNight ? "#ffffff" : "#000000",
                }}
              >
                {group.letter}
              </div>
              <ul className="divide-y divide-slate-100 dark:divide-neutral-800">
                {group.items.map((item) => {
                  const category =
                    allCategories.find((c) => c.id === item.categoryId) ??
                    allCategories[allCategories.length - 1];
                  const CategoryIcon = category.icon;
                  return (
                    <LibraryItemRow
                      key={item.id}
                      item={item}
                      leadingIcon={
                        <CategoryIcon
                          size={16}
                          strokeWidth={1.75}
                          className="shrink-0 text-slate-400 dark:text-neutral-500"
                        />
                      }
                      onToggleFavorite={toggleLibraryItemFavorite}
                      onDelete={deleteLibraryItem}
                      onSendToStore={sendLibraryItemToStore}
                    />
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
