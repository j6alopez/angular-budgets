import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Budget } from '../../budgets/interfaces/budget';
import { BudgetService } from '../../budgets/services/budget.service';
import { BudgetsListComponent } from '../../budgets/components/budgets-list/budgets-list.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { PanelComponent } from '../../budgets/components/panel/panel.component';
import { Settings } from '../../budgets/interfaces/settings';
import { WelcomeComponent } from '../../../shared/components/welcome/welcome.component';

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
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  public addedBudgets: boolean[] = [];
  public budgets: Budget[] = [];

  public baseCost: number = 0;
  public additionalCost: number = 0;
  public totalCost: number = 0;

  public form: FormGroup = this.fb.group({
    addedServices : this.fb.array( [
    ])
  });

  
  constructor(
    private budgetService: BudgetService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.budgets = this.budgetService.getBudgets();
    this.addedBudgets = new Array<boolean>(this.budgets.length).fill(false);
  }

  onCheckSelection(index: number, checked: boolean): void {
    this.addedBudgets[index] = checked;
    const cost = this.budgets[index].cost;
    this.baseCost += checked ? cost : -cost;
    this.calculateTotalCost();
  }

  handleSettingsChanged( index:number, settings: Settings): void {
    console.log(settings);
    const additionalCost: number = this.budgets[index].additionalCost!;
    this.additionalCost = this.budgetService.calculateAdditionalCost(additionalCost, settings);
    this.calculateTotalCost();
  }

  private calculateTotalCost(): void {
    this.totalCost = this.baseCost + this.additionalCost
  }

}
