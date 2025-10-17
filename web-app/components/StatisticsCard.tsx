'use client';

import { ReactNode } from 'react';
import Card from './ui/Card';
import { LucideIcon } from 'lucide-react';

interface StatisticsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

export default function StatisticsCard({
  title,
  value,
  icon: Icon,
  trend,
  color = 'text-primary-600',
}: StatisticsCardProps) {
  return (
    <Card className="p-6 hover:shadow-lg dark:hover:shadow-xl transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">{value}</p>
          {trend && (
            <p
              className={`text-sm font-medium ${
                trend.isPositive ? 'text-success-600 dark:text-success-400' : 'text-danger-600 dark:text-danger-400'
              }`}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
