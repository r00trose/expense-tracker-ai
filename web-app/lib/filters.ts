import type { Expense, ExpenseFilters, SortConfig } from '@/types/expense';
import { isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns';

export function filterExpenses(expenses: Expense[], filters: ExpenseFilters): Expense[] {
  return expenses.filter((expense) => {
    // Category filter
    if (filters.category && filters.category !== 'all' && expense.category !== filters.category) {
      return false;
    }

    // Payment method filter
    if (
      filters.paymentMethod &&
      filters.paymentMethod !== 'all' &&
      expense.paymentMethod !== filters.paymentMethod
    ) {
      return false;
    }

    // Date range filter
    if (filters.startDate || filters.endDate) {
      const expenseDate = parseISO(expense.date);
      const start = filters.startDate ? startOfDay(parseISO(filters.startDate)) : new Date(0);
      const end = filters.endDate ? endOfDay(parseISO(filters.endDate)) : new Date();

      if (!isWithinInterval(expenseDate, { start, end })) {
        return false;
      }
    }

    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      return (
        expense.description.toLowerCase().includes(searchLower) ||
        expense.amount.toString().includes(searchLower)
      );
    }

    return true;
  });
}

export function sortExpenses(expenses: Expense[], sortConfig: SortConfig): Expense[] {
  const sorted = [...expenses];

  sorted.sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortConfig.field) {
      case 'date':
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
        break;
      case 'amount':
        aValue = a.amount;
        bValue = b.amount;
        break;
      case 'category':
        aValue = a.category;
        bValue = b.category;
        break;
      case 'description':
        aValue = a.description.toLowerCase();
        bValue = b.description.toLowerCase();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return sortConfig.order === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.order === 'asc' ? 1 : -1;
    return 0;
  });

  return sorted;
}
