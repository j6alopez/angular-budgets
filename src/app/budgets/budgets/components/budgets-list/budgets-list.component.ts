import { Component, OnDestroy, OnInit, Signal, computed } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Budget } from '../../interfaces/budget';
import { CommonModule } from '@angular/common';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
   selector: 'budgets-list',
   standalone: true,
   imports: [CommonModule],
   templateUrl: './budgets-list.component.html',
   styleUrl: './budgets-list.component.scss',
})
export class BudgetsListComponent< K extends keyof Budget & string> implements OnInit, OnDestroy {
   private signalBudgets!: Signal<Budget[]>;
   public budgets!: Budget[];

   private searchSubject: Subject<string> = new Subject<string>();
   private debouncerSubscription?: Subscription;

   private sortFields: Map< K, boolean> = new Map< K, boolean>([
      ['createdOn' as K, false],
      ['totalCost' as K, false],
      ['name' as K, false],
   ]);


   constructor(private budgetService: BudgetService) {}

   ngOnInit(): void {
      this.signalBudgets = computed(() => {
         this.budgets = this.budgetService.budgets(); 
         return this.budgetService.budgets();
      });
      this.budgets = this.budgetService.budgets();
      this.debouncerSubscription = this.searchSubject
         .pipe(debounceTime(400))
         .subscribe((value) => {
            this.searchByName(value);
         });
   }

   ngOnDestroy(): void {
      this.debouncerSubscription?.unsubscribe();
   }

   onSearchNameKeyUp( name: string): void {
      this.searchSubject.next( name);
   }

   searchByName(name: string) {
      if (name === '') {
         this.budgets = this.budgetService.budgets();
         return;
      }
      this.budgets = this.budgets.filter((budget) =>
         budget.name.includes(name)
      );
   }

   sortByField < K extends keyof Budget & string> (field: K): void {
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

   containsBudgets(): boolean {
      console.log(this.signalBudgets());
      return this.signalBudgets().length > 0;
   }

   isActive(field: K): boolean {
      return this.sortFields.get(field)!;
   }

   manageSorting(field: K) {
      this.sortByField( field);
      this.markFieldAsActive( field as K);
   }

   markFieldAsActive(field: K) {
      this.sortFields.forEach((value, key, map) => {
         field === key 
            ? map.set( key, true)
            : map.set( key, false);
      });
   }

}
