import { FormGroup } from '@angular/forms';
import { Injectable, signal } from '@angular/core';

import { Budget } from '../interfaces/budget';
import { BudgetView } from '../interfaces/budget-view';
import { Customizations } from '../interfaces/customizations';
import { Item } from '../interfaces/item';

@Injectable({
   providedIn: 'root',
})
export class BudgetService {
   private budgetSignal = signal<Budget[]>([
      {
         items: [
            {
               id: 1,
               title: 'Seo',
               description: `Campanya de SEO completa`,
               baseCost: 300,
            },
            {
               id: 1,
               title: 'Web',
               description: `Campanya de SEO completa`,
               baseCost: 300,
            }
         ],
         name: 'ultimo',
         email: 'email',
         totalCost: 300,
         telephone: '1234568',
         createdOn: '2024-03-16T10:46:41.247Z'
      },
      {
         items: [
            {
               id: 1,
               title: 'Seo',
               description: `Campanya de SEO completa`,
               baseCost: 300,
            },
            {
               id: 1,
               title: 'Web',
               description: `Campanya de SEO completa`,
               baseCost: 300,
            }
         ],
         name: 'primero',
         email: 'email',
         totalCost: 600,
         telephone: '1234568',
         createdOn: '2024-02-16T10:46:41.247Z'
      },
   ]);
   public readonly budgets = this.budgetSignal.asReadonly();

   private readonly serviceItems: Item[] = [
      {
         id: 1,
         title: 'Seo',
         description: `Campanya de SEO completa`,
         baseCost: 300,
      },
      {
         id: 2,
         title: 'Adds',
         description: `Campanya de publicitat`,
         baseCost: 400,
      },
      {
         id: 3,
         title: 'Web',
         description: `Programació d'un web responsive completa`,
         baseCost: 500,
         customizations: {
            itemId: 3,
            pages: 0,
            languages: 0,
            cost: 30,
         },
      },
   ];

   getItems(): Item[] {
      return this.serviceItems.slice();
   }

   private calculateCustomizationCost(customizations: Customizations): number {
      const { pages, languages, cost } = customizations;
      return pages * languages * cost!;
   }

   save(budgetBiew: BudgetView, form: FormGroup) {
      const { name, telephone, email } = form.value;
      const newBudget: Budget = { 
         ...budgetBiew, name, telephone, email,
         createdOn: new Date( Date.now()).toISOString()
      };
      this.budgetSignal.update((budgets) => [...budgets, newBudget]);
   }

   calculateTotal(items: Item[]): number {
      return items.reduce((totalCost, item) => {
         const customizationsCost: number = item.customizations
            ? this.calculateCustomizationCost(item.customizations)
            : 0;
         return totalCost + item.baseCost + customizationsCost;
      }, 0);
   }
}
