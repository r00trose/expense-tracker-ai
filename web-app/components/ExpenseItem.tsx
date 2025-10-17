'use client';

import { format, parseISO } from 'date-fns';
import type { Expense } from '@/types/expense';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '@/lib/constants';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from './ui/Button';
import { Trash2, Calendar, CreditCard, Edit } from 'lucide-react';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

export default function ExpenseItem({ expense, onDelete, onEdit }: ExpenseItemProps) {
  const { formatAmount } = useCurrency();
  const { t } = useLanguage();
  const category = EXPENSE_CATEGORIES.find((c) => c.value === expense.category);
  const paymentMethod = PAYMENT_METHODS.find((p) => p.value === expense.paymentMethod);

  const getCategoryLabel = (categoryValue: string) => {
    return t[categoryValue as keyof typeof t] as string;
  };

  const getPaymentMethodLabel = (methodValue: string) => {
    const key = methodValue === 'credit-card' ? 'creditCard' :
                methodValue === 'debit-card' ? 'debitCard' :
                methodValue === 'bank-transfer' ? 'bankTransfer' :
                methodValue === 'digital-wallet' ? 'digitalWallet' :
                methodValue;
    return t[key as keyof typeof t] as string;
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md dark:hover:shadow-xl transition-all duration-200 animate-fade-in">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${category?.color || 'bg-gray-500'}`} />
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{expense.description}</h3>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{format(parseISO(expense.date), 'MMM dd, yyyy')}</span>
            </div>

            <div className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${category?.color || 'bg-gray-500'}`} />
              <span>{getCategoryLabel(expense.category)}</span>
            </div>

            <div className="flex items-center gap-1">
              <CreditCard className="w-4 h-4" />
              <span>{getPaymentMethodLabel(expense.paymentMethod)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{formatAmount(expense.amount)}</p>
          </div>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(expense)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:text-primary-400 dark:hover:text-primary-300 dark:hover:bg-primary-900"
              title={t.edit}
            >
              <Edit className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(expense.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-danger-600 hover:text-danger-700 hover:bg-danger-50 dark:text-danger-400 dark:hover:text-danger-300 dark:hover:bg-danger-900"
              title={t.delete}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
