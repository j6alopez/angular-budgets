import { Injectable } from '@angular/core';
import { Budget } from '../interfaces/budget';

@Injectable({
  providedIn: 'root',

})
export class BudgetService {
  constructor() {}

  private budgets: Budget[] = [
    {
      budgetType: 'Seo',
      price: 300,
      description: `Campanya de SEO completa`,
    },
    {
      budgetType: 'Adds',
      price: 400,
      description: `Campanya de publicitat`,
    },
    {
      budgetType: 'Web',
      price: 500,
      description: `Programació d'un web responsive completa`,
    },
  ];

  getBudgets(): Budget[] {
    return this.budgets;
  }
}
