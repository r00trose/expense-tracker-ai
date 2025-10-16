import type { Expense, ExpenseStats, ExpenseCategory, PaymentMethod } from '@/types/expense';
import { format, parseISO } from 'date-fns';

export function calculateStatistics(expenses: Expense[]): ExpenseStats {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const count = expenses.length;
  const average = count > 0 ? total / count : 0;

  // By category
  const byCategory = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    {} as Record<ExpenseCategory, number>
  );

  // By payment method
  const byPaymentMethod = expenses.reduce(
    (acc, expense) => {
      acc[expense.paymentMethod] = (acc[expense.paymentMethod] || 0) + expense.amount;
      return acc;
    },
    {} as Record<PaymentMethod, number>
  );

  // By month
  const byMonth = expenses.reduce(
    (acc, expense) => {
      const month = format(parseISO(expense.date), 'yyyy-MM');
      acc[month] = (acc[month] || 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  // Trend data (last 6 months)
  const trend = Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-6)
    .map(([month, amount]) => ({
      month: format(parseISO(`${month}-01`), 'MMM yyyy'),
      amount,
    }));

  return {
    total,
    count,
    average,
    byCategory,
    byPaymentMethod,
    byMonth,
    trend,
  };
}
