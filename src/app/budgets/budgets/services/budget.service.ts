import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { Customizations } from '../interfaces/extra-features';
import { Budget } from '../interfaces/budget';

@Injectable({
   providedIn: 'root',
})
export class BudgetService {
   constructor() {}

   private serviceItems: Item[] = [
      {
         serviceItem: 'Seo',
         description: `Campanya de SEO completa`,
         baseCost: 300,
      },
      {
         serviceItem: 'Adds',
         description: `Campanya de publicitat`,
         baseCost: 400,
      },
      {
         serviceItem: 'Web',
         description: `Programació d'un web responsive completa`,
         baseCost: 500,
         customizations: {
            pages: 0,
            languages: 0,
            cost: 30,
         },
      },
   ];

   getItems(): Item[] {
      return this.serviceItems;
   }

   private calculateCustomizationCost(customizations: Customizations): number {
      const { pages, languages, cost } = customizations;
      return pages * languages * cost!;
   }

   private calculateTotalCost(budget: Budget): void {
      budget.totalCost = budget.baseCost + budget.customizationCost;
   }

   manageItem(budget: Budget, item: Item, added: boolean): void {
      let itemCustomizationCost: number = item.customizations
         ? this.calculateCustomizationCost(item.customizations)
         : 0;

      itemCustomizationCost = added
         ? itemCustomizationCost
         : -itemCustomizationCost; 
        
      const itembaseCost: number = added ? item.baseCost : -item.baseCost;
      budget.baseCost += itembaseCost;
      budget.customizationCost += itemCustomizationCost;

      this.calculateTotalCost(budget);
   }

   manageItemCustomization( budget: Budget, item: Item):void {
    budget.customizationCost = this.calculateCustomizationCost(item.customizations!);
    this.calculateTotalCost(budget);
   }

}
