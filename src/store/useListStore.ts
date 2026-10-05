import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_ENABLED_STORE_IDS, type CategoryId, type LibraryItem, type ShoppingItem, type StoreId } from "../types";
import { idbStorage } from "./persist";

function makeId() {
  return crypto.randomUUID();
}

interface ListState {
  items: ShoppingItem[];
  libraryItems: LibraryItem[];
  enabledStoreIds: StoreId[];
  addItem: (storeId: StoreId, name: string, quantity?: string) => void;
  toggleItem: (id: string) => void;
  deleteItem: (id: string) => void;
  clearChecked: (storeId: StoreId) => void;
  addLibraryItem: (name: string, categoryId: CategoryId, quantity?: string) => void;
  toggleLibraryItemFavorite: (id: string) => void;
  deleteLibraryItem: (id: string) => void;
  sendLibraryItemToStore: (libraryItemId: string, storeId: StoreId) => void;
  setStoreEnabled: (storeId: StoreId, enabled: boolean) => void;
}

export const useListStore = create<ListState>()(
  persist(
    (set, get) => ({
      items: [],
      libraryItems: [],
      enabledStoreIds: DEFAULT_ENABLED_STORE_IDS,

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
    }),
    {
      name: "chopping-list-store",
      storage: idbStorage(),
      partialize: (state) => ({
        items: state.items,
        libraryItems: state.libraryItems,
        enabledStoreIds: state.enabledStoreIds,
      }),
    }
  )
);
