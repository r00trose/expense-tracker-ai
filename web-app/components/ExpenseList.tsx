'use client';

import { useState } from 'react';
import type { Expense, SortConfig } from '@/types/expense';
import { useLanguage } from '@/contexts/LanguageContext';
import ExpenseItem from './ExpenseItem';
import Button from './ui/Button';
import Card from './ui/Card';
import { ArrowUpDown, ArrowUp, ArrowDown, Receipt } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
  onSort: (config: SortConfig) => void;
}

export default function ExpenseList({ expenses, onDelete, onEdit, onSort }: ExpenseListProps) {
  const { t } = useLanguage();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'date', order: 'desc' });

  const handleSort = (field: SortConfig['field']) => {
    const newOrder: SortConfig['order'] =
      sortConfig.field === field && sortConfig.order === 'asc' ? 'desc' : 'asc';
    const newConfig: SortConfig = { field, order: newOrder };
    setSortConfig(newConfig);
    onSort(newConfig);
  };

  const SortButton = ({ field, label }: { field: SortConfig['field']; label: string }) => {
    const isActive = sortConfig.field === field;
    const icon = isActive ? (
      sortConfig.order === 'asc' ? (
        <ArrowUp className="w-4 h-4" />
      ) : (
        <ArrowDown className="w-4 h-4" />
      )
    ) : (
      <ArrowUpDown className="w-4 h-4 opacity-50" />
    );

    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleSort(field)}
        className={isActive ? 'bg-gray-100 dark:bg-gray-700' : ''}
      >
        {label}
        {icon}
      </Button>
    );
  };

  if (expenses.length === 0) {
    return (
      <Card className="p-12 text-center animate-fade-in">
        <Receipt className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{t.noExpenses}</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {t.noExpensesDescription}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4 animate-slide-up">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {expenses.length} {expenses.length === 1 ? t.expense : t.expenses}
          </h3>
          <div className="flex gap-2 flex-wrap">
            <SortButton field="date" label={t.sortByDate} />
            <SortButton field="amount" label={t.sortByAmount} />
            <SortButton field="category" label={t.sortByCategory} />
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}
