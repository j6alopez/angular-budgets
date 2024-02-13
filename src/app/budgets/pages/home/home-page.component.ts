import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Budget } from '../../budgets/interfaces/budget';
import { BudgetService } from '../../budgets/services/budget.service';
import { BudgetsListComponent } from '../../budgets/components/budgets-list/budgets-list.component';
import { Customizations } from '../../budgets/interfaces/extra-features';
import {
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

   public budget: Budget = {
      items: [],
      baseCost: 0,
      customizationCost: 0,
      totalCost: 0,
   };

   public subscriptions: Subscription[] = [];
   public form: FormGroup = new FormGroup({
      services: new FormArray([],[this.validatorService.hasAtLeastOneSelection]),
      name: new FormControl('', [
         Validators.required,
         Validators.pattern(ValidatorService.firstNameAndLastnamePattern)
      ]),
      telephone: new FormControl('', [
         Validators.required,
         Validators.pattern(ValidatorService.spanishPhonePattern)
      ]),
      email: new FormControl('', [
         Validators.required, 
         Validators.pattern(ValidatorService.emailPattern)
      ])
   });

   constructor(
      private budgetService: BudgetService,
      private validatorService: ValidatorService
   ) {}

   ngOnInit(): void {
      this.budget.items = this.budgetService.getItems();
      const formArray: FormArray = this.form.get('services') as FormArray;
      this.initFormArray(formArray, this.budget.items.length);
      this.subscribeToFormControls(formArray);
   }

   ngOnDestroy(): void {
      this.subscriptions.forEach((subscription) => {
         subscription.unsubscribe();
      });
   }

   onItemManaged(index: number, added: boolean): void {
      const item: Item = this.budget.items[index];
      this.budgetService.manageItem( this.budget, item, added );
   }

   handleCustomizationsChanged(index: number, newCustomizations: Customizations): void {
      const item: Item = this.budget.items[index];
      item.customizations!.languages = newCustomizations.languages;
      item.customizations!.pages = newCustomizations.pages;
      this.budgetService.manageItemCustomization(this.budget, item );
   }

   hasCustomizations(index: number): boolean {
      return this.budget.items[index].customizations !== undefined;
   }

   getCustomizations(index: number): Customizations {
      return this.budget.items[index].customizations!;
   }

   onSubmit(): void {

   }

   private subscribeToFormControls(formArray: FormArray): void {
      formArray.controls.forEach((control, index) => {
         const subscription: Subscription = control.valueChanges.subscribe(
            (checked) => {
               this.onItemManaged(index, checked);
            }
         );
         this.subscriptions.push(subscription);
      });
   }

   public isChecked(index: number): boolean {
      return this.servicesFormArray.at(index).value;
   }

   private get servicesFormArray(): FormArray {
      return this.form.get('services') as FormArray;
   }

   private initFormArray(formArray: FormArray, length: number): void {
      let index = 0;
      while (index < length) {
         formArray.push(new FormControl(false));
         index++;
      }
   }
}
