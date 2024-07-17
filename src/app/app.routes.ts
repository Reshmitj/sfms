import { Routes } from '@angular/router';
import { BudgetsComponent } from './budgets/budgets.component';
import { ExpensesComponent } from './expenses/expenses.component';

export const routes: Routes = [
  { path: 'budgets', component: BudgetsComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: '', redirectTo: '/budgets', pathMatch: 'full' }
];
