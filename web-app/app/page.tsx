'use client';

import { useState, useEffect } from 'react';
import type { Expense, ExpenseFilters, SortConfig } from '@/types/expense';
import { storage } from '@/lib/storage';
import { filterExpenses, sortExpenses } from '@/lib/filters';
import { calculateStatistics } from '@/lib/statistics';
import { exportToCSV } from '@/lib/export';
import { formatCurrency } from '@/lib/utils';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseFiltersComponent from '@/components/ExpenseFilters';
import ExpenseList from '@/components/ExpenseList';
import StatisticsCard from '@/components/StatisticsCard';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import ExpenseTrend from '@/components/ExpenseTrend';
import PaymentMethodBreakdown from '@/components/PaymentMethodBreakdown';
import Button from '@/components/ui/Button';
import { Wallet, TrendingUp, Receipt, DollarSign, Download } from 'lucide-react';

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<ExpenseFilters>({
    category: 'all',
    paymentMethod: 'all',
    startDate: '',
    endDate: '',
    searchTerm: '',
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'date', order: 'desc' });
  const [isClient, setIsClient] = useState(false);

  // Load expenses on mount
  useEffect(() => {
    setIsClient(true);
    const loadedExpenses = storage.getExpenses();
    setExpenses(loadedExpenses);
  }, []);

  const handleAddExpense = (expense: Expense) => {
    storage.addExpense(expense);
    setExpenses(storage.getExpenses());
  };

  const handleDeleteExpense = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      storage.deleteExpense(id);
      setExpenses(storage.getExpenses());
    }
  };

  const handleSort = (config: SortConfig) => {
    setSortConfig(config);
  };

  const handleExport = () => {
    const filtered = filterExpenses(expenses, filters);
    exportToCSV(filtered);
  };

  // Filter and sort expenses
  const filteredExpenses = filterExpenses(expenses, filters);
  const sortedExpenses = sortExpenses(filteredExpenses, sortConfig);

  // Calculate statistics
  const stats = calculateStatistics(filteredExpenses);

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
                <p className="text-sm text-gray-600">Manage your finances with ease</p>
              </div>
            </div>
            <Button variant="secondary" onClick={handleExport} disabled={expenses.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatisticsCard
            title="Total Expenses"
            value={formatCurrency(stats.total)}
            icon={DollarSign}
            color="text-primary-600"
          />
          <StatisticsCard
            title="Total Transactions"
            value={stats.count}
            icon={Receipt}
            color="text-purple-600"
          />
          <StatisticsCard
            title="Average Expense"
            value={formatCurrency(stats.average)}
            icon={TrendingUp}
            color="text-green-600"
          />
          <StatisticsCard
            title="Categories"
            value={Object.keys(stats.byCategory).length}
            icon={Wallet}
            color="text-orange-600"
          />
        </div>

        {/* Add Expense Form */}
        <div className="mb-8">
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <ExpenseFiltersComponent filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Charts and Breakdown */}
        {expenses.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <CategoryBreakdown stats={stats} />
            <ExpenseTrend stats={stats} />
            <PaymentMethodBreakdown stats={stats} />
          </div>
        )}

        {/* Expense List */}
        <ExpenseList expenses={sortedExpenses} onDelete={handleDeleteExpense} onSort={handleSort} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
