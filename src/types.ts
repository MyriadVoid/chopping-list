import {
  Apple,
  Bath,
  Beef,
  Candy,
  Carrot,
  Cherry,
  Citrus,
  Coffee,
  Cookie,
  createLucideIcon,
  CupSoda,
  Drumstick,
  Egg,
  Fish,
  IceCreamCone,
  Leaf,
  Milk,
  Nut,
  Package,
  Pizza,
  Popcorn,
  Sandwich,
  Shapes,
  ShoppingBasket,
  Snowflake,
  Soup,
  SprayCan,
  Tag,
  Utensils,
  Wine,
  type LucideIcon,
} from "lucide-react";

const BreadSlice: LucideIcon = createLucideIcon({
  name: "bread-slice",
  node: [
    ["path", { d: "M5 20V11a7 7 0 0 1 14 0v9z", key: "slice-body" }],
    ["circle", { cx: "10", cy: "9.5", r: "0.6", fill: "currentColor", stroke: "none", key: "slice-bubble-1" }],
    ["circle", { cx: "14.5", cy: "11.5", r: "0.6", fill: "currentColor", stroke: "none", key: "slice-bubble-2" }],
    ["circle", { cx: "11.5", cy: "14.5", r: "0.6", fill: "currentColor", stroke: "none", key: "slice-bubble-3" }],
  ],
});

export type StoreId = "aldi" | "migros" | "coop" | "denner" | "lidl" | "manor";

export interface StoreDef {
  id: StoreId;
  label: string;
  color: string;
  bgDay: string;
  bgNight: string;
}

export const STORES: StoreDef[] = [
  { id: "aldi", label: "Aldi", color: "#1f4ea8", bgDay: "#dbeafe", bgNight: "#0f1b3d" },
  { id: "migros", label: "Migros", color: "#ff6200", bgDay: "#ffedd5", bgNight: "#3a2208" },
  { id: "coop", label: "Coop", color: "#e4002b", bgDay: "#fee2e2", bgNight: "#3a0f12" },
  { id: "denner", label: "Denner", color: "#b9191b", bgDay: "#f6e1e1", bgNight: "#2d0d0d" },
  { id: "lidl", label: "Lidl", color: "#1b2f91", bgDay: "#e1e4f1", bgNight: "#0d1125" },
  { id: "manor", label: "Manor", color: "#db281b", bgDay: "#fae3e1", bgNight: "#34100d" },
];

export const DEFAULT_ENABLED_STORE_IDS: StoreId[] = ["aldi", "migros", "coop"];

export const LIBRARY_BG_DAY = "#f8fafc";
export const LIBRARY_BG_NIGHT = "#171717";

export const CHROME_BG_DAY = "#ffffff";
export const CHROME_BG_NIGHT = "#0a0a0a";

export interface ShoppingItem {
  id: string;
  storeId: StoreId;
  name: string;
  quantity?: string;
  checked: boolean;
  createdAt: number;
}

export type CategoryId = string;

export interface CategoryDef {
  id: CategoryId;
  label: string;
  iconKey: string;
}

// Every icon a category (default or user-created) can use.
export const ICON_OPTIONS: { key: string; icon: LucideIcon }[] = [
  { key: "apple", icon: Apple },
  { key: "carrot", icon: Carrot },
  { key: "leaf", icon: Leaf },
  { key: "milk", icon: Milk },
  { key: "egg", icon: Egg },
  { key: "beef", icon: Beef },
  { key: "drumstick", icon: Drumstick },
  { key: "fish", icon: Fish },
  { key: "bread", icon: BreadSlice },
  { key: "sandwich", icon: Sandwich },
  { key: "package", icon: Package },
  { key: "snowflake", icon: Snowflake },
  { key: "cup-soda", icon: CupSoda },
  { key: "coffee", icon: Coffee },
  { key: "wine", icon: Wine },
  { key: "popcorn", icon: Popcorn },
  { key: "candy", icon: Candy },
  { key: "cookie", icon: Cookie },
  { key: "ice-cream", icon: IceCreamCone },
  { key: "pizza", icon: Pizza },
  { key: "soup", icon: Soup },
  { key: "cherry", icon: Cherry },
  { key: "citrus", icon: Citrus },
  { key: "nut", icon: Nut },
  { key: "basket", icon: ShoppingBasket },
  { key: "utensils", icon: Utensils },
  { key: "spray-can", icon: SprayCan },
  { key: "bath", icon: Bath },
  { key: "tag", icon: Tag },
  { key: "shapes", icon: Shapes },
];

const ICON_LOOKUP = new Map(ICON_OPTIONS.map((o) => [o.key, o.icon]));

export function getCategoryIcon(iconKey: string): LucideIcon {
  return ICON_LOOKUP.get(iconKey) ?? Tag;
}

export const DEFAULT_CATEGORY_ICON_KEY = "tag";

export const DEFAULT_CATEGORIES: CategoryDef[] = [
  { id: "fruits", label: "Fruits", iconKey: "apple" },
  { id: "vegetables", label: "Vegetables", iconKey: "carrot" },
  { id: "vegetarian", label: "Vegetarian", iconKey: "leaf" },
  { id: "dairy_eggs", label: "Dairy & Eggs", iconKey: "milk" },
  { id: "meat", label: "Meat", iconKey: "beef" },
  { id: "fish", label: "Fish", iconKey: "fish" },
  { id: "bakery", label: "Bakery", iconKey: "bread" },
  { id: "pantry", label: "Pantry & Dry Goods", iconKey: "package" },
  { id: "frozen", label: "Frozen", iconKey: "snowflake" },
  { id: "beverages", label: "Beverages", iconKey: "cup-soda" },
  { id: "savory_snacks", label: "Savory Snacks", iconKey: "popcorn" },
  { id: "sweets", label: "Sweets", iconKey: "candy" },
  { id: "household", label: "Household", iconKey: "spray-can" },
  { id: "personal_care", label: "Personal Care", iconKey: "bath" },
  { id: "other", label: "Other", iconKey: "shapes" },
];

export function slugifyCategoryName(label: string): string {
  const base = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return base || "category";
}

export interface LibraryItem {
  id: string;
  name: string;
  categoryId: CategoryId;
  quantity?: string;
  favorite: boolean;
  createdAt: number;
}

export type TabId = StoreId | "library";
