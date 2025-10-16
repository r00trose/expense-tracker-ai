export type ExpenseCategory =
  | 'food'
  | 'transportation'
  | 'entertainment'
  | 'utilities'
  | 'shopping'
  | 'healthcare'
  | 'education'
  | 'other';

export type PaymentMethod = 'cash' | 'credit-card' | 'debit-card' | 'bank-transfer' | 'digital-wallet';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // ISO date string
  paymentMethod: PaymentMethod;
  createdAt: string; // ISO date string
}

export interface ExpenseFormData {
  description: string;
  amount: string;
  category: ExpenseCategory;
  date: string;
  paymentMethod: PaymentMethod;
}

export interface ExpenseFilters {
  category?: ExpenseCategory | 'all';
  paymentMethod?: PaymentMethod | 'all';
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}

export type SortField = 'date' | 'amount' | 'category' | 'description';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

export interface ExpenseStats {
  total: number;
  count: number;
  average: number;
  byCategory: Record<ExpenseCategory, number>;
  byPaymentMethod: Record<PaymentMethod, number>;
  byMonth: Record<string, number>;
  trend: {
    month: string;
    amount: number;
  }[];
}
