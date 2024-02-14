import { Customizations } from "./customizations";

export interface Item {
    id: number;
    title: string;
    description: string;
    baseCost: number;
    customizations?: Customizations;
}
