import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item';
import { Customizations } from '../interfaces/customizations';
import { Budget } from '../interfaces/budget';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { BudgetView } from '../interfaces/budget-view';

@Injectable({
   providedIn: 'root',
})
export class BudgetService {
   public budgetsSubject = new Subject<Budget[]>();
   private budgets: Budget[] = [];

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
      const updatedBudget: Budget = { ...budgetBiew, name, telephone, email };
      this.budgets.push(updatedBudget);
      this.budgetsSubject.next(this.getBudgets());
   }

   getBudgets(): Budget[] {
      return this.budgets.slice();
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
