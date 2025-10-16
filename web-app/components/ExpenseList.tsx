'use client';

import { useState } from 'react';
import type { Expense, SortConfig } from '@/types/expense';
import ExpenseItem from './ExpenseItem';
import Button from './ui/Button';
import Card from './ui/Card';
import { ArrowUpDown, ArrowUp, ArrowDown, Receipt } from 'lucide-react';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onSort: (config: SortConfig) => void;
}

export default function ExpenseList({ expenses, onDelete, onSort }: ExpenseListProps) {
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
        className={isActive ? 'bg-gray-100' : ''}
      >
        {label}
        {icon}
      </Button>
    );
  };

  if (expenses.length === 0) {
    return (
      <Card className="p-12 text-center animate-fade-in">
        <Receipt className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No expenses found</h3>
        <p className="text-gray-600">
          Start by adding your first expense or adjust your filters.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4 animate-slide-up">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {expenses.length} {expenses.length === 1 ? 'Expense' : 'Expenses'}
          </h3>
          <div className="flex gap-2 flex-wrap">
            <SortButton field="date" label="Date" />
            <SortButton field="amount" label="Amount" />
            <SortButton field="category" label="Category" />
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
