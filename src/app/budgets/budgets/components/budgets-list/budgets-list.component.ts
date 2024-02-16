import { Component, OnInit, Signal, computed } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Budget } from '../../interfaces/budget';
import { CommonModule } from '@angular/common';

@Component({
   selector: 'budgets-list',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './budgets-list.component.html',
   styleUrl: './budgets-list.component.scss',
})
export class BudgetsListComponent implements OnInit {
   private signalBudgets!: Signal<Budget[]>;
   public budgets!: Budget[];

   constructor(private budgetService: BudgetService) {}

   ngOnInit(): void {
      this.signalBudgets = computed(() => {
         return this.budgetService.budgets();
      });
      this.budgets = this.budgetService.budgets();
   }

   public sortByField<K extends keyof Budget>(field: K& string): void {
      this.budgets.sort((budget1, budget2) => {
          const value1 = budget1[field];
          const value2 = budget2[field];
  
          if (value1 > value2) {
              return 1;
          }
  
          if (value2 > value1) {
              return -1;
          }
  
          return 0;
      });
  }
}

