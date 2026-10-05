import { get, set } from "idb-keyval";
import type { PersistStorage, StorageValue } from "zustand/middleware";

export function idbStorage<T>(): PersistStorage<T> {
  return {
    getItem: async (name) => {
      const value = await get(name);
      return (value as StorageValue<T>) ?? null;
    },
    setItem: async (name, value) => {
      await set(name, value);
    },
    removeItem: async (name) => {
      await set(name, undefined);
    },
  };
}
