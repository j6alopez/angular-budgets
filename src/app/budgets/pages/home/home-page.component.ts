import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Budget } from '../../budgets/interfaces/budget';
import { BudgetService } from '../../budgets/services/budget.service';
import { BudgetsListComponent } from '../../budgets/components/budgets-list/budgets-list.component';
import { Customizations } from '../../budgets/interfaces/customizations';
import {
   AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Item } from '../../budgets/interfaces/item';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PanelComponent } from '../../budgets/components/panel/panel.component';
import { Subscription } from 'rxjs';
import { WelcomeComponent } from '../../../shared/components/welcome/welcome.component';
import { ValidatorService } from '../../../shared/services/validator.service';
import { BudgetView } from '../../budgets/interfaces/budget-view';

@Component({
   selector: 'budgets-home',
   standalone: true,
   imports: [
      BudgetsListComponent,
      CommonModule,
      FormsModule,
      ModalComponent,
      PanelComponent,
      ReactiveFormsModule,
      WelcomeComponent,
   ],
   templateUrl: './home-page.component.html',
   styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, OnDestroy {

   public offeredItems: Item[] = [];

   public budgetView: BudgetView = {
      items: [],
      totalCost: 0,
   };

   public subscriptions: Subscription[] = [];
   public form: FormGroup = new FormGroup({
      items: new FormArray([],[this.validatorService.hasAtLeastOneSelection]),
      name: new FormControl('', [
         Validators.required,
         // Validators.pattern(ValidatorService.firstNameAndLastnamePattern)
      ]),
      telephone: new FormControl('', [
         Validators.required,
         // Validators.pattern(ValidatorService.spanishPhonePattern)
      ]),
      email: new FormControl('', [
         Validators.required, 
         // Validators.pattern(ValidatorService.emailPattern)
      ])
   });

   constructor(
      private budgetService: BudgetService,
      private validatorService: ValidatorService
   ) {}

   ngOnInit(): void {
      // this.offeredItems = this.budgetService.getItems();
      this.initFormArray();
      this.subscribeToFormGroup();
   }

   ngOnDestroy(): void {
      this.subscriptions.forEach((subscription) => {
         subscription.unsubscribe();
      });
   }

   handleCustomizationsChanged(newCustomizations: Customizations): void {
      const item: Item = this.budgetView.items.find( item => item.id === newCustomizations.itemId)!;
      if (item) {
         const {languages, pages} = newCustomizations;
         item.customizations!.languages = languages;
         item.customizations!.pages = pages;
         this.budgetView.totalCost = this.budgetService.calculateTotal([...this.budgetView.items]);
      }
   }

   public isChecked(index: number): boolean {
      return this.itemsFormArray.at(index).value;
   }

   hasCustomizations(index: number): boolean {
      return this.offeredItems[index].customizations !== undefined;
   }

   getCustomizations(id: number): Customizations {
      const customizations: Customizations = this.budgetView.items
         .find(item => item.id === id)!.customizations!;  
      return {...customizations};
      
   }

   onSubmit(): void {
      if (this.form.invalid) {
         return;
      }
         this.budgetService.save(this.budgetView, this.form);
         this.budgetView.items = [];
         this.budgetView.totalCost = 0;
         this.form.reset();
   }

   private subscribeToFormGroup(): void {
         const subscription: Subscription = this.form.valueChanges.subscribe(
            () => { 
               this.updateSelections(this.itemsFormArray);
               this.budgetView.totalCost = this.budgetService.calculateTotal([...this.budgetView.items]);
            }
         );
         this.subscriptions.push(subscription);
   }

   private updateSelections( form: FormArray) {
      this.budgetView.items = [];
      form.controls.forEach( (control: AbstractControl, index) => {
         if(control.value) {
            const budgetViewItem = { ...this.offeredItems[index] };
            this.budgetView.items.push(budgetViewItem);
         }
      });
   }
   private get itemsFormArray(): FormArray {
      return this.form.get('items') as FormArray;
   }

   private initFormArray(): void {
      const formArray: FormArray = this.form.get('items') as FormArray;
      for( const item of this.offeredItems) {
         formArray.push(new FormControl(false));
      }
   }
}
