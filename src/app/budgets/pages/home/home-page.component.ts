import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { Budget } from '../../budgets/interfaces/budget';
import { BudgetService } from '../../budgets/services/budget.service';
import { BudgetsListComponent } from '../../budgets/components/budgets-list/budgets-list.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PanelComponent } from '../../budgets/components/panel/panel.component';
import { Settings } from '../../budgets/interfaces/settings';
import { WelcomeComponent } from '../../../shared/components/welcome/welcome.component';
import { Subscription } from 'rxjs';
import { ModalService } from '../../../shared/modal.service';

@Component({
  selector: 'budgets-home',
  standalone: true,
  imports: [
    BudgetsListComponent,
    CommonModule,
    ModalComponent,
    PanelComponent,
    ReactiveFormsModule,
    WelcomeComponent,
    FormsModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit, OnDestroy {
  public budgets: Budget[] = [];

  public baseCost: number = 0;
  public additionalCost: number = 0;
  public totalCost: number = 0;

  public formSubscriptions: Subscription[] = [];
  public form: FormGroup = this.fb.group({
  });

  public bodyText = 'This text can be updated in modal 1';
  
  constructor(
    private budgetService: BudgetService,
    private fb: FormBuilder,
    public modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.budgets = this.budgetService.getBudgets();

    Array(this.budgets.length)
      .fill(false)
      .forEach((value, index) => {
        const formControl = new FormControl(value);
        this.form.addControl(index.toString(), formControl);
        this.subscribeToCheckFormControl(formControl, index);
      });
  }

  onCheckChanged(index: number, checked: boolean): void {
    const cost = this.budgets[index].cost;
    this.baseCost += checked ? cost : -cost;
    this.calculateTotalCost();
  }

  handleSettingsChanged( index:number, settings: Settings): void {
    const additionalCost: number = this.budgets[index].additionalCost!;
    this.additionalCost = this.budgetService.calculateAdditionalCost(additionalCost, settings);
    this.calculateTotalCost();
  }

  private calculateTotalCost(): void {
    this.totalCost = this.baseCost + this.additionalCost
  }

  private subscribeToCheckFormControl(formControl: FormControl, index: number): void {
    const subscription: Subscription = formControl.valueChanges.subscribe( checked => {
      this.onCheckChanged(index, checked);
    })
    this.formSubscriptions.push( subscription );
  }

  public isChecked(index: number): boolean {
    return this.form.controls[index].value;
  }

  ngOnDestroy(): void {
    this.formSubscriptions.forEach(subscription => {
      subscription.unsubscribe;
    })
  }
}
