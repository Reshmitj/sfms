import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../budget.service';
import { Budget } from '../budget';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [CommonModule],  // Ensure CommonModule is imported here
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.css']
})
export class BudgetsComponent implements OnInit {
  budgets: Budget[] = [];

  constructor(private budgetService: BudgetService) { }

  ngOnInit(): void {
    this.loadBudgets();
  }

  loadBudgets(): void {
    this.budgetService.getBudgets().subscribe(budgets => this.budgets = budgets);
  }

  addBudget(name: string, amount: string): void {
    if (name && amount) {
      const newBudget: Budget = { id: 0, name, amount: parseFloat(amount) };
      this.budgetService.addBudget(newBudget).subscribe(
        budget => {
          this.budgets.push(budget);
          console.log('Budget added successfully:', budget);
        },
        error => {
          console.error('Error adding budget:', error);
        }
      );
    } else {
      console.error('Name and amount are required to add a budget');
    }
  }

  deleteBudget(id: number): void {
    this.budgetService.deleteBudget(id).subscribe(() => this.budgets = this.budgets.filter(b => b.id !== id));
  }
}
