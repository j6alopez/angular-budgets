import { Routes } from '@angular/router';
import { HomePageComponent } from './budgets/pages/home/home-page.component';

export const routes: Routes = [
    {
        path:'home',
        component: HomePageComponent
    },
    {   path: '**',
        redirectTo: 'home',
    }
];
