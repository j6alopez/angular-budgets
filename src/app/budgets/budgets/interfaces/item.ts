import { Customizations } from "./extra-features";
import { ServiceItem } from "./service-item";

export interface Item {
    serviceItem: ServiceItem;
    description: string;
    baseCost: number;
    customizations?: Customizations;
}
