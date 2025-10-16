'use client';

import { useState, FormEvent } from 'react';
import { format } from 'date-fns';
import type { ExpenseFormData, Expense } from '@/types/expense';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '@/lib/constants';
import { validateExpenseForm, hasErrors, ValidationErrors } from '@/lib/validation';
import { generateId } from '@/lib/utils';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Card from './ui/Card';
import { PlusCircle } from 'lucide-react';

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
}

export default function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    description: '',
    amount: '',
    category: 'food',
    date: format(new Date(), 'yyyy-MM-dd'),
    paymentMethod: 'cash',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateExpenseForm(formData);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      return;
    }

    setIsSubmitting(true);

    // Create expense
    const expense: Expense = {
      id: generateId(),
      description: formData.description.trim(),
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      paymentMethod: formData.paymentMethod,
      createdAt: new Date().toISOString(),
    };

    // Add expense
    onAddExpense(expense);

    // Reset form
    setFormData({
      description: '',
      amount: '',
      category: 'food',
      date: format(new Date(), 'yyyy-MM-dd'),
      paymentMethod: 'cash',
    });
    setErrors({});
    setIsSubmitting(false);
  };

  return (
    <Card className="p-6 animate-slide-down">
      <div className="flex items-center gap-2 mb-6">
        <PlusCircle className="w-6 h-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900">Add New Expense</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Description"
            placeholder="e.g., Grocery shopping"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            error={errors.description}
            required
          />

          <Input
            label="Amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            error={errors.amount}
            required
          />

          <Select
            label="Category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value as ExpenseFormData['category'] })
            }
            options={EXPENSE_CATEGORIES.map((cat) => ({
              value: cat.value,
              label: cat.label,
            }))}
            error={errors.category}
            required
          />

          <Input
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            error={errors.date}
            max={format(new Date(), 'yyyy-MM-dd')}
            required
          />

          <Select
            label="Payment Method"
            value={formData.paymentMethod}
            onChange={(e) =>
              setFormData({
                ...formData,
                paymentMethod: e.target.value as ExpenseFormData['paymentMethod'],
              })
            }
            options={PAYMENT_METHODS}
            error={errors.paymentMethod}
            required
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
            {isSubmitting ? 'Adding...' : 'Add Expense'}
          </Button>
        </div>
      </form>
    </Card>
  );
}
