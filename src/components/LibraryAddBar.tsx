import { useState, type FormEvent } from "react";
import { useListStore } from "../store/useListStore";
import { useTheme } from "../theme/ThemeContext";
import {
  buildCategoryList,
  CATEGORIES,
  CHROME_BG_DAY,
  CHROME_BG_NIGHT,
  type CategoryId,
} from "../types";
import { CategoryPicker } from "./CategoryPicker";

interface LibraryAddBarProps {
  onAdd: (name: string, categoryId: CategoryId, quantity?: string) => void;
}

const fieldClass =
  "rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500";

export function LibraryAddBar({ onAdd }: LibraryAddBarProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState<CategoryId>(CATEGORIES[0].id);
  const { theme } = useTheme();
  const isNight = theme === "night";
  const customCategories = useListStore((s) => s.customCategories);
  const categories = buildCategoryList(customCategories);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name, categoryId, quantity);
    setName("");
    setQuantity("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-3 border-b border-slate-200 dark:border-neutral-800"
      style={{ backgroundColor: isNight ? CHROME_BG_NIGHT : CHROME_BG_DAY }}
    >
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add an ingredient…"
          className={`flex-1 ${fieldClass}`}
        />
        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Qty"
          className={`w-16 ${fieldClass}`}
        />
      </div>
      <div className="flex gap-2">
        <CategoryPicker
          value={categoryId}
          onChange={setCategoryId}
          className="flex-1"
          categories={categories}
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg border px-4 py-2 font-medium transition-colors"
          style={
            isNight
              ? { backgroundColor: "#000000", color: "#ffffff", borderColor: "#525252" }
              : { backgroundColor: "#d4d4d8", color: "#18181b", borderColor: "#d4d4d8" }
          }
        >
          Add
        </button>
      </div>
    </form>
  );
}
