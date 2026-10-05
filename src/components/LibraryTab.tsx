import { useState } from "react";
import { useListStore } from "../store/useListStore";
import { useTheme } from "../theme/ThemeContext";
import { CATEGORIES, CHROME_BG_DAY, CHROME_BG_NIGHT } from "../types";
import { CategorySection } from "./CategorySection";
import { LibraryItemRow } from "./LibraryItemRow";
import { LibraryAddBar } from "./LibraryAddBar";

type SortMode = "category" | "alphabetical";

export function LibraryTab() {
  const libraryItems = useListStore((s) => s.libraryItems);
  const addLibraryItem = useListStore((s) => s.addLibraryItem);
  const toggleLibraryItemFavorite = useListStore((s) => s.toggleLibraryItemFavorite);
  const deleteLibraryItem = useListStore((s) => s.deleteLibraryItem);
  const sendLibraryItemToStore = useListStore((s) => s.sendLibraryItemToStore);

  const [sortMode, setSortMode] = useState<SortMode>("category");
  const { theme } = useTheme();
  const isNight = theme === "night";

  const alphabetical = [...libraryItems].sort((a, b) =>
    a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
  );

  return (
    <div className="flex flex-col h-full">
      <LibraryAddBar onAdd={addLibraryItem} />

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
          CATEGORIES.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              items={libraryItems.filter((item) => (item.categoryId ?? "other") === category.id)}
              onToggleFavorite={toggleLibraryItemFavorite}
              onDelete={deleteLibraryItem}
              onSendToStore={sendLibraryItemToStore}
            />
          ))
        ) : alphabetical.length === 0 ? (
          <p className="p-6 text-center text-slate-400 dark:text-neutral-500">
            No ingredients planned yet.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-neutral-800">
            {alphabetical.map((item) => {
              const category =
                CATEGORIES.find((c) => c.id === item.categoryId) ??
                CATEGORIES[CATEGORIES.length - 1];
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
        )}
      </div>
    </div>
  );
}
