'use client';

import type { ExpenseStats } from '@/types/expense';
import { EXPENSE_CATEGORIES } from '@/lib/constants';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Card from './ui/Card';
import { PieChart } from 'lucide-react';

interface CategoryBreakdownProps {
  stats: ExpenseStats;
}

export default function CategoryBreakdown({ stats }: CategoryBreakdownProps) {
  const { formatAmount } = useCurrency();
  const { t } = useLanguage();

  const categoryData = Object.entries(stats.byCategory)
    .map(([category, amount]) => {
      const categoryInfo = EXPENSE_CATEGORIES.find((c) => c.value === category);
      const percentage = stats.total > 0 ? (amount / stats.total) * 100 : 0;
      return {
        category,
        amount,
        percentage,
        label: t[category as keyof typeof t] as string || category,
        color: categoryInfo?.color || 'bg-gray-500',
      };
    })
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  if (categoryData.length === 0) {
    return null;
  }

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <PieChart className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.categoryBreakdown}</h3>
      </div>

      <div className="space-y-4">
        {categoryData.map((item) => (
          <div key={item.category}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {formatAmount(item.amount)}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                  ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${item.color} transition-all duration-500`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
