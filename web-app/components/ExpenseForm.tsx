'use client';

import { useState, FormEvent, useEffect } from 'react';
import { format } from 'date-fns';
import type { ExpenseFormData, Expense } from '@/types/expense';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '@/lib/constants';
import { validateExpenseForm, hasErrors, ValidationErrors } from '@/lib/validation';
import { generateId } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Card from './ui/Card';
import { PlusCircle, Edit, X } from 'lucide-react';

interface ExpenseFormProps {
  onAddExpense: (expense: Expense) => void;
  onUpdateExpense: (expense: Expense) => void;
  editingExpense: Expense | null;
  onCancelEdit: () => void;
}

export default function ExpenseForm({ onAddExpense, onUpdateExpense, editingExpense, onCancelEdit }: ExpenseFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<ExpenseFormData>({
    description: '',
    amount: '',
    category: 'food',
    date: format(new Date(), 'yyyy-MM-dd'),
    paymentMethod: 'cash',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (editingExpense) {
      setFormData({
        description: editingExpense.description,
        amount: editingExpense.amount.toString(),
        category: editingExpense.category,
        date: editingExpense.date,
        paymentMethod: editingExpense.paymentMethod,
      });
    } else {
      // Reset form when not editing
      setFormData({
        description: '',
        amount: '',
        category: 'food',
        date: format(new Date(), 'yyyy-MM-dd'),
        paymentMethod: 'cash',
      });
      setErrors({});
    }
  }, [editingExpense]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateExpenseForm(formData);
    setErrors(validationErrors);

    if (hasErrors(validationErrors)) {
      return;
    }

    setIsSubmitting(true);

    if (editingExpense) {
      // Update expense
      const updatedExpense: Expense = {
        ...editingExpense,
        description: formData.description.trim(),
        amount: parseFloat(formData.amount),
        category: formData.category,
        date: formData.date,
        paymentMethod: formData.paymentMethod,
      };
      onUpdateExpense(updatedExpense);
    } else {
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
      onAddExpense(expense);
    }

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

  const isEditMode = !!editingExpense;

  return (
    <Card className={`p-6 animate-slide-down ${isEditMode ? 'ring-2 ring-primary-500 dark:ring-primary-600' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {isEditMode ? (
            <>
              <Edit className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t.updateExpense}</h2>
            </>
          ) : (
            <>
              <PlusCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t.addNewExpense}</h2>
            </>
          )}
        </div>
        {isEditMode && (
          <Button variant="ghost" size="sm" onClick={onCancelEdit}>
            <X className="w-4 h-4 mr-1" />
            {t.cancelEdit}
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={t.description}
            placeholder={t.descriptionPlaceholder}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            error={errors.description}
            required
          />

          <Input
            label={t.amount}
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
            label={t.category}
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value as ExpenseFormData['category'] })
            }
            options={EXPENSE_CATEGORIES.map((cat) => ({
              value: cat.value,
              label: t[cat.value as keyof typeof t] as string,
            }))}
            error={errors.category}
            required
          />

          <Input
            label={t.date}
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            error={errors.date}
            max={format(new Date(), 'yyyy-MM-dd')}
            required
          />

          <Select
            label={t.paymentMethod}
            value={formData.paymentMethod}
            onChange={(e) =>
              setFormData({
                ...formData,
                paymentMethod: e.target.value as ExpenseFormData['paymentMethod'],
              })
            }
            options={PAYMENT_METHODS.map((method) => ({
              value: method.value,
              label: t[method.value === 'credit-card' ? 'creditCard' : method.value === 'debit-card' ? 'debitCard' : method.value === 'bank-transfer' ? 'bankTransfer' : method.value === 'digital-wallet' ? 'digitalWallet' : method.value] as string,
            }))}
            error={errors.paymentMethod}
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          {isEditMode && (
            <Button type="button" variant="ghost" onClick={onCancelEdit}>
              {t.cancelEdit}
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting} className="min-w-[120px]">
            {isSubmitting ? (isEditMode ? t.updating : t.adding) : (isEditMode ? t.updateExpense : t.addExpense)}
          </Button>
        </div>
      </form>
    </Card>
  );
}
