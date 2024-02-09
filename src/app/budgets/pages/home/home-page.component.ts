import { Component } from '@angular/core';
import { WelcomeComponent } from '../../../shared/components/welcome/welcome.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'budgets-home',
  standalone: true,
  imports: [
    WelcomeComponent,
    ModalComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
