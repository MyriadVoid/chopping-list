import {
  Apple,
  Bath,
  Beef,
  Candy,
  Carrot,
  CupSoda,
  Croissant,
  Milk,
  Package,
  Popcorn,
  Shapes,
  Snowflake,
  SprayCan,
  type LucideIcon,
} from "lucide-react";

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
  | "meat_fish"
  | "bakery"
  | "pantry"
  | "frozen"
  | "beverages"
  | "savory_snacks"
  | "sweets"
  | "household"
  | "personal_care"
  | "other";

export interface CategoryDef {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
}

export const CATEGORIES: CategoryDef[] = [
  { id: "fruits", label: "Fruits", icon: Apple },
  { id: "vegetables", label: "Vegetables", icon: Carrot },
  { id: "dairy_eggs", label: "Dairy & Eggs", icon: Milk },
  { id: "meat_fish", label: "Meat & Fish", icon: Beef },
  { id: "bakery", label: "Bakery", icon: Croissant },
  { id: "pantry", label: "Pantry & Dry Goods", icon: Package },
  { id: "frozen", label: "Frozen", icon: Snowflake },
  { id: "beverages", label: "Beverages", icon: CupSoda },
  { id: "savory_snacks", label: "Savory Snacks", icon: Popcorn },
  { id: "sweets", label: "Sweets", icon: Candy },
  { id: "household", label: "Household", icon: SprayCan },
  { id: "personal_care", label: "Personal Care", icon: Bath },
  { id: "other", label: "Other", icon: Shapes },
];

export interface LibraryItem {
  id: string;
  name: string;
  categoryId: CategoryId;
  quantity?: string;
  favorite: boolean;
  createdAt: number;
}

export type TabId = StoreId | "library";
