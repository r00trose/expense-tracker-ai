import type { ExpenseCategory, PaymentMethod } from '@/types/expense';

export const EXPENSE_CATEGORIES: { value: ExpenseCategory; label: string; color: string }[] = [
  { value: 'food', label: 'Food & Dining', color: 'bg-orange-500' },
  { value: 'transportation', label: 'Transportation', color: 'bg-blue-500' },
  { value: 'entertainment', label: 'Entertainment', color: 'bg-purple-500' },
  { value: 'utilities', label: 'Utilities', color: 'bg-yellow-500' },
  { value: 'shopping', label: 'Shopping', color: 'bg-pink-500' },
  { value: 'healthcare', label: 'Healthcare', color: 'bg-red-500' },
  { value: 'education', label: 'Education', color: 'bg-green-500' },
  { value: 'other', label: 'Other', color: 'bg-gray-500' },
];

export const PAYMENT_METHODS: { value: PaymentMethod; label: string }[] = [
  { value: 'cash', label: 'Cash' },
  { value: 'credit-card', label: 'Credit Card' },
  { value: 'debit-card', label: 'Debit Card' },
  { value: 'bank-transfer', label: 'Bank Transfer' },
  { value: 'digital-wallet', label: 'Digital Wallet' },
];

export const STORAGE_KEY = 'expense-tracker-data';
