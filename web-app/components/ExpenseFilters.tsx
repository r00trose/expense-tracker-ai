'use client';

import type { ExpenseFilters } from '@/types/expense';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '@/lib/constants';
import Input from './ui/Input';
import Select from './ui/Select';
import Button from './ui/Button';
import Card from './ui/Card';
import { Filter, X } from 'lucide-react';

interface ExpenseFiltersProps {
  filters: ExpenseFilters;
  onFiltersChange: (filters: ExpenseFilters) => void;
}

export default function ExpenseFiltersComponent({
  filters,
  onFiltersChange,
}: ExpenseFiltersProps) {
  const handleReset = () => {
    onFiltersChange({
      category: 'all',
      paymentMethod: 'all',
      startDate: '',
      endDate: '',
      searchTerm: '',
    });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.paymentMethod !== 'all' ||
    filters.startDate ||
    filters.endDate ||
    filters.searchTerm;

  return (
    <Card className="p-6 animate-slide-down">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <X className="w-4 h-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Input
          placeholder="Search..."
          value={filters.searchTerm || ''}
          onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
        />

        <Select
          options={[
            { value: 'all', label: 'All Categories' },
            ...EXPENSE_CATEGORIES.map((cat) => ({
              value: cat.value,
              label: cat.label,
            })),
          ]}
          value={filters.category || 'all'}
          onChange={(e) => onFiltersChange({ ...filters, category: e.target.value as any })}
        />

        <Select
          options={[
            { value: 'all', label: 'All Payment Methods' },
            ...PAYMENT_METHODS,
          ]}
          value={filters.paymentMethod || 'all'}
          onChange={(e) => onFiltersChange({ ...filters, paymentMethod: e.target.value as any })}
        />

        <Input
          type="date"
          placeholder="Start Date"
          value={filters.startDate || ''}
          onChange={(e) => onFiltersChange({ ...filters, startDate: e.target.value })}
        />

        <Input
          type="date"
          placeholder="End Date"
          value={filters.endDate || ''}
          onChange={(e) => onFiltersChange({ ...filters, endDate: e.target.value })}
        />
      </div>
    </Card>
  );
}
