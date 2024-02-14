import { Item } from "./item";

export interface Budget {
    items: Item [];
    name: string;
    email: string;
    telephone:string;
    totalCost: number;
}
