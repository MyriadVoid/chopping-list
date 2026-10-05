import { Star } from "lucide-react";
import type { ReactNode } from "react";
import { STORES, type LibraryItem, type StoreId } from "../types";

interface LibraryItemRowProps {
  item: LibraryItem;
  leadingIcon?: ReactNode;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onSendToStore: (itemId: string, storeId: StoreId) => void;
}

export function LibraryItemRow({
  item,
  leadingIcon,
  onToggleFavorite,
  onDelete,
  onSendToStore,
}: LibraryItemRowProps) {
  return (
    <li className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-neutral-900">
      <button
        onClick={() => onToggleFavorite(item.id)}
        aria-label={item.favorite ? "Remove from favorites" : "Mark as favorite"}
        className="shrink-0"
      >
        <Star
          size={20}
          strokeWidth={1.75}
          className={item.favorite ? undefined : "text-slate-300 dark:text-neutral-600"}
          fill={item.favorite ? "#f59e0b" : "none"}
          stroke={item.favorite ? "#f59e0b" : "currentColor"}
        />
      </button>
      {leadingIcon}
      <div className="flex-1">
        <span className="text-base text-slate-900 dark:text-neutral-100">{item.name}</span>
        {item.quantity && (
          <span className="ml-2 text-sm text-slate-400 dark:text-neutral-500">
            {item.quantity}
          </span>
        )}
      </div>
      <select
        defaultValue=""
        onChange={(e) => {
          const storeId = e.target.value as StoreId | "";
          if (storeId) {
            onSendToStore(item.id, storeId);
          }
          e.target.value = "";
        }}
        className="shrink-0 text-sm border border-slate-300 rounded-md px-1 py-1 bg-white text-slate-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
      >
        <option value="" disabled>
          Send to…
        </option>
        {STORES.map((store) => (
          <option key={store.id} value={store.id}>
            {store.label}
          </option>
        ))}
      </select>
      <button
        onClick={() => onDelete(item.id)}
        aria-label="Delete"
        className="shrink-0 text-slate-400 active:text-red-600 text-sm px-1 dark:text-neutral-600"
      >
        ✕
      </button>
    </li>
  );
}
