import { Component } from '@angular/core';
import { BudgetsListComponent } from '../../budgets/components/budgets-list/budgets-list.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { WelcomeComponent } from '../../../shared/components/welcome/welcome.component';

@Component({
  selector: 'budgets-home',
  standalone: true,
  imports: [
    BudgetsListComponent,
    ModalComponent,
    WelcomeComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
