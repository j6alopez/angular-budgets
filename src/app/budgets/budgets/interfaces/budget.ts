import { Item } from "./item";

export interface Budget {
    items: Item [];
    baseCost: number;
    customizationCost: number;
    totalCost: number;
}
