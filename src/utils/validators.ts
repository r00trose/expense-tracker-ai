import type { ExpenseInput } from '../types/expense.js';

export function validateExpenseInput(input: ExpenseInput): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!input.description || input.description.trim().length === 0) {
    errors.push('Description is required');
  }

  if (input.amount !== undefined && (input.amount <= 0 || isNaN(input.amount))) {
    errors.push('Amount must be a positive number');
  }

  if (input.date && !(input.date instanceof Date) && isNaN(Date.parse(input.date as any))) {
    errors.push('Invalid date format');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}
