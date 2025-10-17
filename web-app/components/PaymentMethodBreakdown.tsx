'use client';

import type { ExpenseStats } from '@/types/expense';
import { PAYMENT_METHODS } from '@/lib/constants';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Card from './ui/Card';
import { CreditCard } from 'lucide-react';

interface PaymentMethodBreakdownProps {
  stats: ExpenseStats;
}

export default function PaymentMethodBreakdown({ stats }: PaymentMethodBreakdownProps) {
  const { formatAmount } = useCurrency();
  const { t } = useLanguage();

  const paymentData = Object.entries(stats.byPaymentMethod)
    .map(([method, amount]) => {
      const methodInfo = PAYMENT_METHODS.find((p) => p.value === method);
      const percentage = stats.total > 0 ? (amount / stats.total) * 100 : 0;
      const key = method === 'credit-card' ? 'creditCard' :
                  method === 'debit-card' ? 'debitCard' :
                  method === 'bank-transfer' ? 'bankTransfer' :
                  method === 'digital-wallet' ? 'digitalWallet' :
                  method;
      return {
        method,
        amount,
        percentage,
        label: t[key as keyof typeof t] as string || method,
      };
    })
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  if (paymentData.length === 0) {
    return null;
  }

  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-cyan-500',
  ];

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <CreditCard className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t.paymentMethodBreakdown}</h3>
      </div>

      <div className="space-y-3">
        {paymentData.map((item, index) => (
          <div
            key={item.method}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${colors[index % colors.length]}`} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {formatAmount(item.amount)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.percentage.toFixed(1)}%</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
