import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useListStore } from "../store/useListStore";
import { useTheme } from "../theme/ThemeContext";
import { CHROME_BG_DAY, CHROME_BG_NIGHT } from "../types";

interface AddItemBarProps {
  onAdd: (name: string, quantity?: string) => void;
  placeholder?: string;
}

interface Suggestion {
  name: string;
  quantity?: string;
}

export function AddItemBar({ onAdd, placeholder }: AddItemBarProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const isNight = theme === "night";
  const libraryItems = useListStore((s) => s.libraryItems);

  const suggestions = useMemo<Suggestion[]>(() => {
    const query = name.trim().toLowerCase();
    if (!query) return [];
    const seen = new Set<string>();
    const matches: Suggestion[] = [];
    for (const item of libraryItems) {
      const lower = item.name.toLowerCase();
      if (!lower.includes(query) || seen.has(lower)) continue;
      seen.add(lower);
      matches.push({ name: item.name, quantity: item.quantity });
    }
    matches.sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(query) ? 0 : 1;
      const bStarts = b.name.toLowerCase().startsWith(query) ? 0 : 1;
      if (aStarts !== bStarts) return aStarts - bStarts;
      return a.name.localeCompare(b.name);
    });
    return matches.slice(0, 6);
  }, [name, libraryItems]);

  useEffect(() => {
    if (!showSuggestions) return;
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSuggestions]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name, quantity);
    setName("");
    setQuantity("");
    setShowSuggestions(false);
  }

  function selectSuggestion(suggestion: Suggestion) {
    setName(suggestion.name);
    if (suggestion.quantity) setQuantity(suggestion.quantity);
    setShowSuggestions(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 p-3 border-b border-slate-200 dark:border-neutral-800"
      style={{ backgroundColor: isNight ? CHROME_BG_NIGHT : CHROME_BG_DAY }}
    >
      <div ref={wrapperRef} className="relative flex-1">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => {
            if (name.trim()) setShowSuggestions(true);
          }}
          placeholder={placeholder ?? "Add an item…"}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="absolute z-10 mt-1 w-full max-h-56 overflow-y-auto rounded-lg border border-slate-300 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900">
            {suggestions.map((suggestion) => (
              <li key={suggestion.name}>
                <button
                  type="button"
                  onClick={() => selectSuggestion(suggestion)}
                  className="w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-slate-900 hover:bg-slate-100 dark:text-neutral-100 dark:hover:bg-neutral-800"
                >
                  <span className="truncate">{suggestion.name}</span>
                  {suggestion.quantity && (
                    <span className="text-sm text-slate-400 dark:text-neutral-500">
                      {suggestion.quantity}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <input
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Qty"
        className="w-16 rounded-lg border border-slate-300 bg-white px-2 py-2 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:placeholder:text-neutral-500"
      />
      <button
        type="submit"
        className="rounded-lg border px-4 py-2 font-medium transition-colors"
        style={
          isNight
            ? { backgroundColor: "#000000", color: "#ffffff", borderColor: "#525252" }
            : { backgroundColor: "#d4d4d8", color: "#18181b", borderColor: "#d4d4d8" }
        }
      >
        Add
      </button>
    </form>
  );
}
