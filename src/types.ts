import {
  Apple,
  Bath,
  Beef,
  Candy,
  Carrot,
  createLucideIcon,
  CupSoda,
  Fish,
  Milk,
  Package,
  Popcorn,
  Shapes,
  Snowflake,
  SprayCan,
  Tag,
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

export type CategoryId =
  | "fruits"
  | "vegetables"
  | "dairy_eggs"
  | "meat"
  | "fish"
  | "bakery"
  | "pantry"
  | "frozen"
  | "beverages"
  | "savory_snacks"
  | "sweets"
  | "household"
  | "personal_care"
  | "other"
  | (string & {});

export interface CategoryDef {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
}

export const CATEGORIES: CategoryDef[] = [
  { id: "fruits", label: "Fruits", icon: Apple },
  { id: "vegetables", label: "Vegetables", icon: Carrot },
  { id: "dairy_eggs", label: "Dairy & Eggs", icon: Milk },
  { id: "meat", label: "Meat", icon: Beef },
  { id: "fish", label: "Fish", icon: Fish },
  { id: "bakery", label: "Bakery", icon: BreadSlice },
  { id: "pantry", label: "Pantry & Dry Goods", icon: Package },
  { id: "frozen", label: "Frozen", icon: Snowflake },
  { id: "beverages", label: "Beverages", icon: CupSoda },
  { id: "savory_snacks", label: "Savory Snacks", icon: Popcorn },
  { id: "sweets", label: "Sweets", icon: Candy },
  { id: "household", label: "Household", icon: SprayCan },
  { id: "personal_care", label: "Personal Care", icon: Bath },
  { id: "other", label: "Other", icon: Shapes },
];

export interface CustomCategory {
  id: string;
  label: string;
}

export const CUSTOM_CATEGORY_ICON: LucideIcon = Tag;

export function slugifyCategoryName(label: string): string {
  const base = label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return base || "category";
}

export function buildCategoryList(customCategories: CustomCategory[]): CategoryDef[] {
  return [
    ...CATEGORIES,
    ...customCategories.map((c) => ({ id: c.id, label: c.label, icon: CUSTOM_CATEGORY_ICON })),
  ];
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
