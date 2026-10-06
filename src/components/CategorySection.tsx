import { Trash2 } from "lucide-react";
import { useState } from "react";
import { getCategoryIcon, type CategoryDef, type LibraryItem, type StoreId } from "../types";
import { LibraryItemRow } from "./LibraryItemRow";

interface CategorySectionProps {
  category: CategoryDef;
  items: LibraryItem[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onSendToStore: (itemId: string, storeId: StoreId) => void;
  onDeleteCategory: (categoryId: string) => void;
}

export function CategorySection({
  category,
  items,
  onToggleFavorite,
  onDelete,
  onSendToStore,
  onDeleteCategory,
}: CategorySectionProps) {
  const [open, setOpen] = useState(false);
  const Icon = getCategoryIcon(category.iconKey);

  return (
    <div className="border-b border-slate-200 dark:border-neutral-800">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left"
      >
        <span className="flex items-center gap-2 font-medium text-slate-900 dark:text-neutral-100">
          <Icon size={18} strokeWidth={1.75} className="shrink-0" />
          {category.label}
        </span>
        <span className="flex items-center gap-3 text-slate-400 dark:text-neutral-500">
          {items.length > 0 && <span className="text-sm">{items.length}</span>}
          <span
            onClick={(e) => {
              e.stopPropagation();
              onDeleteCategory(category.id);
            }}
            aria-label={`Delete ${category.label} category`}
            className="active:text-red-500"
          >
            <Trash2 size={16} strokeWidth={1.75} />
          </span>
          <svg
            viewBox="0 0 24 24"
            width={16}
            height={16}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </button>

      {open &&
        (items.length === 0 ? (
          <p className="p-6 text-center text-slate-400 dark:text-neutral-500">
            No items in this category yet.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-neutral-800">
            {items.map((item) => (
              <LibraryItemRow
                key={item.id}
                item={item}
                onToggleFavorite={onToggleFavorite}
                onDelete={onDelete}
                onSendToStore={onSendToStore}
              />
            ))}
          </ul>
        ))}
    </div>
  );
}
