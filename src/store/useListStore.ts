import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  DEFAULT_CATEGORIES,
  DEFAULT_CATEGORY_ICON_KEY,
  DEFAULT_ENABLED_STORE_IDS,
  slugifyCategoryName,
  type CategoryDef,
  type CategoryId,
  type LibraryItem,
  type ShoppingItem,
  type StoreId,
} from "../types";
import { idbStorage } from "./persist";

function makeId() {
  return crypto.randomUUID();
}

interface ListState {
  items: ShoppingItem[];
  libraryItems: LibraryItem[];
  enabledStoreIds: StoreId[];
  categories: CategoryDef[];
  addItem: (storeId: StoreId, name: string, quantity?: string) => void;
  toggleItem: (id: string) => void;
  deleteItem: (id: string) => void;
  clearChecked: (storeId: StoreId) => void;
  addLibraryItem: (name: string, categoryId: CategoryId, quantity?: string) => void;
  toggleLibraryItemFavorite: (id: string) => void;
  deleteLibraryItem: (id: string) => void;
  sendLibraryItemToStore: (libraryItemId: string, storeId: StoreId) => void;
  setStoreEnabled: (storeId: StoreId, enabled: boolean) => void;
  addCategory: (label: string, iconKey: string) => void;
  deleteCategory: (id: string) => void;
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      items: [],
      libraryItems: [],
      enabledStoreIds: DEFAULT_ENABLED_STORE_IDS,
      categories: DEFAULT_CATEGORIES,

      addItem: (storeId, name, quantity) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        set((state) => ({
          items: [
            ...state.items,
            {
              id: makeId(),
              storeId,
              name: trimmed,
              quantity: quantity?.trim() || undefined,
              checked: false,
              createdAt: Date.now(),
            },
          ],
        }));
      },

      toggleItem: (id) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
          ),
        }));
      },

      deleteItem: (id) => {
        set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
      },

      clearChecked: (storeId) => {
        set((state) => ({
          items: state.items.filter((item) => item.storeId !== storeId || !item.checked),
        }));
      },

      addLibraryItem: (name, categoryId, quantity) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        set((state) => ({
          libraryItems: [
            ...state.libraryItems,
            {
              id: makeId(),
              name: trimmed,
              categoryId,
              quantity: quantity?.trim() || undefined,
              favorite: false,
              createdAt: Date.now(),
            },
          ],
        }));
      },

      toggleLibraryItemFavorite: (id) => {
        set((state) => ({
          libraryItems: state.libraryItems.map((item) =>
            item.id === id ? { ...item, favorite: !item.favorite } : item
          ),
        }));
      },

      deleteLibraryItem: (id) => {
        set((state) => ({
          libraryItems: state.libraryItems.filter((item) => item.id !== id),
        }));
      },

      sendLibraryItemToStore: (libraryItemId, storeId) => {
        const libraryItem = get().libraryItems.find((item) => item.id === libraryItemId);
        if (!libraryItem) return;
        get().addItem(storeId, libraryItem.name, libraryItem.quantity);
      },

      setStoreEnabled: (storeId, enabled) => {
        set((state) => ({
          enabledStoreIds: enabled
            ? state.enabledStoreIds.includes(storeId)
              ? state.enabledStoreIds
              : [...state.enabledStoreIds, storeId]
            : state.enabledStoreIds.filter((id) => id !== storeId),
        }));
      },

      addCategory: (label, iconKey) => {
        const trimmed = label.trim();
        if (!trimmed) return;
        set((state) => {
          const existingIds = new Set(state.categories.map((c) => c.id));
          const base = slugifyCategoryName(trimmed);
          let id = base;
          let n = 2;
          while (existingIds.has(id)) {
            id = `${base}_${n}`;
            n++;
          }
          return {
            categories: [
              ...state.categories,
              { id, label: trimmed, iconKey: iconKey || DEFAULT_CATEGORY_ICON_KEY },
            ],
          };
        });
      },

      deleteCategory: (id) => {
        set((state) => {
          if (state.categories.length <= 1) return state;
          const remaining = state.categories.filter((c) => c.id !== id);
          const fallbackId = remaining.some((c) => c.id === "other")
            ? "other"
            : remaining[0].id;
          return {
            categories: remaining,
            libraryItems: state.libraryItems.map((item) =>
              item.categoryId === id ? { ...item, categoryId: fallbackId } : item
            ),
          };
        });
      },
    }),
    {
      name: "chopping-list-store",
      storage: idbStorage(),
      partialize: (state) => ({
        items: state.items,
        libraryItems: state.libraryItems,
        enabledStoreIds: state.enabledStoreIds,
        categories: state.categories,
      }),
    }
  )
);
