import type { Expense } from '@/types/expense';
import { STORAGE_KEY } from './constants';

export const storage = {
  getExpenses: (): Expense[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading expenses:', error);
      return [];
    }
  },

  saveExpenses: (expenses: Expense[]): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  },

  addExpense: (expense: Expense): void => {
    const expenses = storage.getExpenses();
    expenses.unshift(expense); // Add to beginning
    storage.saveExpenses(expenses);
  },

  updateExpense: (id: string, updatedExpense: Partial<Expense>): void => {
    const expenses = storage.getExpenses();
    const index = expenses.findIndex((e) => e.id === id);
    if (index !== -1) {
      expenses[index] = { ...expenses[index], ...updatedExpense };
      storage.saveExpenses(expenses);
    }
  },

  deleteExpense: (id: string): void => {
    const expenses = storage.getExpenses();
    const filtered = expenses.filter((e) => e.id !== id);
    storage.saveExpenses(filtered);
  },

  clearAll: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
