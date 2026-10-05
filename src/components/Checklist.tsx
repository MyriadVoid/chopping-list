import { Star } from "lucide-react";
import { useState, type ReactNode } from "react";

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
  const [showChecked, setShowChecked] = useState(false);
  const active = items.filter((item) => !item.checked);
  const checked = items.filter((item) => item.checked);

  return (
    <div className="flex-1 overflow-y-auto">
      {active.length === 0 && (
        <p className="p-6 text-center text-slate-400 dark:text-neutral-500">
          {emptyLabel ?? "Nothing on the list yet."}
        </p>
      )}

      <ul className="divide-y divide-slate-100 dark:divide-neutral-800">
        {active.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-neutral-900"
          >
            <button
              onClick={() => onToggle(item.id)}
              aria-label="Check off"
              className="h-6 w-6 shrink-0 rounded-full border-2 border-slate-300 active:border-emerald-600 dark:border-neutral-600"
            />
            {isFavorite && <FavoriteStar favorite={isFavorite(item)} />}
            <div className="flex-1">
              <span className="text-base text-slate-900 dark:text-neutral-100">{item.name}</span>
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

      {checked.length > 0 && (
        <div className="border-t border-slate-200 dark:border-neutral-800">
          <button
            onClick={() => setShowChecked((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-500 bg-slate-50 dark:bg-neutral-900 dark:text-neutral-400"
          >
            <span>
              {showChecked ? "Hide" : "Show"} checked ({checked.length})
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                onClearChecked();
              }}
              className="text-red-500 active:text-red-700 dark:text-red-400"
            >
              Clear
            </span>
          </button>
          {showChecked && (
            <ul className="divide-y divide-slate-100 dark:divide-neutral-800">
              {checked.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 px-4 py-3 bg-slate-50 text-slate-400 dark:bg-neutral-900 dark:text-neutral-500"
                >
                  <button
                    onClick={() => onToggle(item.id)}
                    aria-label="Uncheck"
                    className="h-6 w-6 shrink-0 rounded-full border-2 border-emerald-500 bg-emerald-500 flex items-center justify-center text-white text-xs"
                  >
                    ✓
                  </button>
                  {isFavorite && <FavoriteStar favorite={isFavorite(item)} />}
                  <div className="flex-1 line-through">
                    {item.name}
                    {item.quantity && <span className="ml-2">{item.quantity}</span>}
                  </div>
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
          )}
        </div>
      )}
    </div>
  );
}
