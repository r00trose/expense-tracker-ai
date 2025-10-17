'use client';

import type { ExpenseStats } from '@/types/expense';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Card from './ui/Card';
import { TrendingUp } from 'lucide-react';

interface ExpenseTrendProps {
  stats: ExpenseStats;
}

export default function ExpenseTrend({ stats }: ExpenseTrendProps) {
  const { formatAmount } = useCurrency();
  const { t } = useLanguage();

  if (stats.trend.length === 0) {
    return null;
  }

  const maxAmount = Math.max(...stats.trend.map((t) => t.amount));

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.expenseTrend}</h3>
      </div>

      <div className="space-y-4">
        {stats.trend.map((item, index) => {
          const barHeight = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0;

          return (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.month}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {formatAmount(item.amount)}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 transition-all duration-500"
                  style={{ width: `${barHeight}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
