import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/budget.service';
import { Budget } from '../../interfaces/budget';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'budgets-list',
standalone: true,
  imports: [CommonModule],
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
