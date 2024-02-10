import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Budget } from '../../interfaces/budget';
import { CommonModule } from '@angular/common';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'budgets-list',
standalone: true,
  imports: [
    CommonModule,
    PanelComponent
  ],
  templateUrl: './budgets-list.component.html',
  styleUrl: './budgets-list.component.scss'
})
export class BudgetsListComponent implements OnInit {
  public budgets: Budget[] = [];

  constructor( private budgetService: BudgetService) {

  }

  ngOnInit(): void {
    this.budgets = this.budgetService.getBudgets();
  }


}
