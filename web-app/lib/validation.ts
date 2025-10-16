import type { ExpenseFormData } from '@/types/expense';

export interface ValidationErrors {
  description?: string;
  amount?: string;
  category?: string;
  date?: string;
  paymentMethod?: string;
}

export function validateExpenseForm(data: ExpenseFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  // Description validation
  if (!data.description.trim()) {
    errors.description = 'Description is required';
  } else if (data.description.trim().length < 3) {
    errors.description = 'Description must be at least 3 characters';
  } else if (data.description.trim().length > 100) {
    errors.description = 'Description must be less than 100 characters';
  }

  // Amount validation
  const amount = parseFloat(data.amount);
  if (!data.amount.trim()) {
    errors.amount = 'Amount is required';
  } else if (isNaN(amount)) {
    errors.amount = 'Amount must be a valid number';
  } else if (amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  } else if (amount > 1000000) {
    errors.amount = 'Amount must be less than 1,000,000';
  }

  // Category validation
  if (!data.category) {
    errors.category = 'Category is required';
  }

  // Date validation
  if (!data.date) {
    errors.date = 'Date is required';
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    if (selectedDate > today) {
      errors.date = 'Date cannot be in the future';
    }
  }

  // Payment method validation
  if (!data.paymentMethod) {
    errors.paymentMethod = 'Payment method is required';
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}
