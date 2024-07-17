import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../expense.service';
import { Expense } from '../expense';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe(expenses => this.expenses = expenses);
  }

  addExpense(description: string, amount: string, category: string): void { 
    const newExpense: Expense = { id: 0, description, amount: parseFloat(amount), category };
    this.expenseService.addExpense(newExpense).subscribe(expense => this.expenses.push(expense));
  }

  deleteExpense(id: number): void {
    this.expenseService.deleteExpense(id).subscribe(() => this.expenses = this.expenses.filter(e => e.id !== id));
  }
}
