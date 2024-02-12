import { Injectable } from '@angular/core';
import { Budget } from '../interfaces/budget';
import { Settings } from '../interfaces/settings';

@Injectable({
  providedIn: 'root',

})
export class BudgetService {

  constructor() {}

  private budgets: Budget[] = [
    {
      budgetType: 'Seo',
      cost: 300,
      description: `Campanya de SEO completa`,
    },
    {
      budgetType: 'Adds',
      cost: 400,
      description: `Campanya de publicitat`,
    },
    {
      budgetType: 'Web',
      cost: 500,
      description: `Programació d'un web responsive completa`,
      additionalCost: 30
    },
  ];


  getBudgets(): Budget[] {
    return this.budgets;
  }

  calculateAdditionalCost(cost: number, settings: Settings): number {
    const { pages, languages} = settings;
    return cost * pages * languages;
  }

  calculateTotalCost(baseCost: number, addtionalCost: number): number {
    return baseCost + addtionalCost;
  }

}
