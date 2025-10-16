export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
  tags?: string[];
  metadata?: {
    merchant?: string;
    paymentMethod?: string;
    [key: string]: unknown;
  };
}

export interface ExpenseInput {
  description: string;
  amount?: number;
  category?: string;
  date?: Date;
}

export type ExpenseCategory =
  | 'food'
  | 'transportation'
  | 'entertainment'
  | 'utilities'
  | 'shopping'
  | 'healthcare'
  | 'education'
  | 'other';
