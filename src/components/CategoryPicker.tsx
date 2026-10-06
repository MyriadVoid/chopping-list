import { useEffect, useRef, useState } from "react";
import { getCategoryIcon, type CategoryDef, type CategoryId } from "../types";

interface CategoryPickerProps {
  value: CategoryId;
  onChange: (categoryId: CategoryId) => void;
  className?: string;
  categories: CategoryDef[];
}

export function CategoryPicker({ value, onChange, className, categories }: CategoryPickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = categories.find((c) => c.id === value) ?? categories[0];
  const SelectedIcon = getCategoryIcon(selected.iconKey);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={rootRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
      >
        <SelectedIcon size={18} strokeWidth={1.75} className="shrink-0" />
        <span className="flex-1 text-left truncate">{selected.label}</span>
        <svg
          viewBox="0 0 24 24"
          width={16}
          height={16}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full max-h-64 overflow-y-auto rounded-lg border border-slate-300 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
          {categories.map((category) => {
            const CategoryIcon = getCategoryIcon(category.iconKey);
            const isSelected = category.id === value;
            return (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(category.id);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-left text-slate-900 hover:bg-slate-100 dark:text-neutral-100 dark:hover:bg-neutral-800"
                  style={isSelected ? { fontWeight: 600 } : undefined}
                >
                  <CategoryIcon size={18} strokeWidth={1.75} className="shrink-0" />
                  <span className="truncate">{category.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
