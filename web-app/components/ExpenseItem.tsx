'use client';

import { format, parseISO } from 'date-fns';
import type { Expense } from '@/types/expense';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '@/lib/constants';
import { formatCurrency } from '@/lib/utils';
import Button from './ui/Button';
import { Trash2, Calendar, CreditCard } from 'lucide-react';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export default function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const category = EXPENSE_CATEGORIES.find((c) => c.value === expense.category);
  const paymentMethod = PAYMENT_METHODS.find((p) => p.value === expense.paymentMethod);

  return (
    <div className="group bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${category?.color || 'bg-gray-500'}`} />
            <h3 className="font-semibold text-gray-900 truncate">{expense.description}</h3>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{format(parseISO(expense.date), 'MMM dd, yyyy')}</span>
            </div>

            <div className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${category?.color || 'bg-gray-500'}`} />
              <span>{category?.label || expense.category}</span>
            </div>

            <div className="flex items-center gap-1">
              <CreditCard className="w-4 h-4" />
              <span>{paymentMethod?.label || expense.paymentMethod}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">{formatCurrency(expense.amount)}</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(expense.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-danger-600 hover:text-danger-700 hover:bg-danger-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
