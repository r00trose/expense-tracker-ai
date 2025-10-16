import type { Expense } from '@/types/expense';
import { format, parseISO } from 'date-fns';

export function exportToCSV(expenses: Expense[]): void {
  if (expenses.length === 0) {
    alert('No expenses to export');
    return;
  }

  // CSV headers
  const headers = ['Date', 'Description', 'Amount', 'Category', 'Payment Method'];

  // CSV rows
  const rows = expenses.map((expense) => [
    format(parseISO(expense.date), 'yyyy-MM-dd'),
    `"${expense.description}"`,
    expense.amount.toFixed(2),
    expense.category,
    expense.paymentMethod,
  ]);

  // Combine headers and rows
  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `expenses-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
