import { Star } from "lucide-react";
import type { ReactNode } from "react";

export interface ChecklistEntry {
  id: string;
  name: string;
  quantity?: string;
  checked: boolean;
}

interface ChecklistProps<T extends ChecklistEntry> {
  items: T[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onClearChecked: () => void;
  renderExtra?: (item: T) => ReactNode;
  emptyLabel?: string;
  isFavorite?: (item: T) => boolean;
}

function FavoriteStar({ favorite }: { favorite: boolean }) {
  return (
    <Star
      size={16}
      strokeWidth={1.75}
      className={favorite ? undefined : "shrink-0 text-slate-300 dark:text-neutral-600"}
      fill={favorite ? "#f59e0b" : "none"}
      stroke={favorite ? "#f59e0b" : "currentColor"}
    />
  );
}

export function Checklist<T extends ChecklistEntry>({
  items,
  onToggle,
  onDelete,
  onClearChecked,
  renderExtra,
  emptyLabel,
  isFavorite,
}: ChecklistProps<T>) {
  const hasChecked = items.some((item) => item.checked);

  return (
    <div className="flex-1 overflow-y-auto">
      {items.length === 0 && (
        <p className="p-6 text-center text-slate-400 dark:text-neutral-500">
          {emptyLabel ?? "Nothing on the list yet."}
        </p>
      )}

      <ul className="divide-y divide-slate-100 dark:divide-neutral-800">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 px-4 py-3 bg-white/60 dark:bg-neutral-900/60"
          >
            <button
              onClick={() => onToggle(item.id)}
              aria-label={item.checked ? "Uncheck" : "Check off"}
              className={
                item.checked
                  ? "h-6 w-6 shrink-0 rounded-full border-2 border-emerald-500 bg-emerald-500 flex items-center justify-center text-white text-xs"
                  : "h-6 w-6 shrink-0 rounded-full border-2 border-slate-300 active:border-emerald-600 dark:border-neutral-600"
              }
            >
              {item.checked && "✓"}
            </button>
            {isFavorite && <FavoriteStar favorite={isFavorite(item)} />}
            <div className={`flex-1 ${item.checked ? "line-through" : ""}`}>
              <span
                className={
                  item.checked
                    ? "text-base text-slate-400 dark:text-neutral-500"
                    : "text-base text-slate-900 dark:text-neutral-100"
                }
              >
                {item.name}
              </span>
              {item.quantity && (
                <span className="ml-2 text-sm text-slate-400 dark:text-neutral-500">
                  {item.quantity}
                </span>
              )}
            </div>
            {renderExtra?.(item)}
            <button
              onClick={() => onDelete(item.id)}
              aria-label="Delete"
              className="shrink-0 text-slate-400 active:text-red-600 text-sm px-1 dark:text-neutral-600"
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      {hasChecked && (
        <div className="p-3">
          <button
            onClick={onClearChecked}
            className="w-full rounded-lg border border-slate-300 dark:border-neutral-700 px-4 py-2 text-sm font-medium text-slate-600 dark:text-neutral-300 transition-colors"
          >
            Clear all crossed items
          </button>
        </div>
      )}
    </div>
  );
}
