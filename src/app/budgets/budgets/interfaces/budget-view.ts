import { Item } from "./item";

export interface BudgetView {
    items: Item [];
    totalCost: number;
}