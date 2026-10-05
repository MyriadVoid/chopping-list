import { useMemo } from "react";
import { useListStore } from "../store/useListStore";
import type { ShoppingItem, StoreId } from "../types";
import { AddItemBar } from "./AddItemBar";
import { Checklist } from "./Checklist";

export function StoreTab({ storeId }: { storeId: StoreId }) {
  const allItems = useListStore((s) => s.items);
  const addItem = useListStore((s) => s.addItem);
  const toggleItem = useListStore((s) => s.toggleItem);
  const deleteItem = useListStore((s) => s.deleteItem);
  const clearChecked = useListStore((s) => s.clearChecked);
  const libraryItems = useListStore((s) => s.libraryItems);

  const items = useMemo(
    () => allItems.filter((item) => item.storeId === storeId),
    [allItems, storeId]
  );

  const favoriteNames = useMemo(
    () =>
      new Set(
        libraryItems.filter((item) => item.favorite).map((item) => item.name.toLowerCase())
      ),
    [libraryItems]
  );

  return (
    <div className="flex flex-col h-full">
      <AddItemBar onAdd={(name, qty) => addItem(storeId, name, qty)} />
      <Checklist
        items={items}
        onToggle={toggleItem}
        onDelete={deleteItem}
        onClearChecked={() => clearChecked(storeId)}
        emptyLabel="No items for this store yet."
        isFavorite={(item: ShoppingItem) => favoriteNames.has(item.name.toLowerCase())}
      />
    </div>
  );
}
