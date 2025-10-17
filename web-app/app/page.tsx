'use client';

import { useState, useEffect } from 'react';
import type { Expense, ExpenseFilters, SortConfig } from '@/types/expense';
import { storage } from '@/lib/storage';
import { filterExpenses, sortExpenses } from '@/lib/filters';
import { calculateStatistics } from '@/lib/statistics';
import { exportToCSV } from '@/lib/export';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseFiltersComponent from '@/components/ExpenseFilters';
import ExpenseList from '@/components/ExpenseList';
import StatisticsCard from '@/components/StatisticsCard';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import ExpenseTrend from '@/components/ExpenseTrend';
import PaymentMethodBreakdown from '@/components/PaymentMethodBreakdown';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ThemeToggle';
import CurrencySelector from '@/components/CurrencySelector';
import LanguageSelector from '@/components/LanguageSelector';
import { Wallet, TrendingUp, Receipt, DollarSign, Download, Trash2 } from 'lucide-react';

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
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const { formatAmount } = useCurrency();
  const { t } = useLanguage();

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

  const handleUpdateExpense = (expense: Expense) => {
    storage.updateExpense(expense.id, expense);
    setExpenses(storage.getExpenses());
    setEditingExpense(null);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    if (confirm(t.deleteConfirm)) {
      storage.deleteExpense(id);
      setExpenses(storage.getExpenses());
      if (editingExpense?.id === id) {
        setEditingExpense(null);
      }
    }
  };

  const handleClearAll = () => {
    if (confirm(t.clearAllConfirm)) {
      const secondConfirm = prompt(t.clearAllSecondConfirm);
      if (secondConfirm === 'DELETE' || secondConfirm === 'SIL') {
        storage.clearAll();
        setExpenses([]);
        setEditingExpense(null);
      }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-600 dark:bg-primary-700 rounded-lg transition-colors duration-300">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">{t.appName}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">{t.appSubtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <LanguageSelector />
              <CurrencySelector />
              <ThemeToggle />
              <Button variant="secondary" onClick={handleExport} disabled={expenses.length === 0}>
                <Download className="w-4 h-4 mr-2" />
                {t.exportCSV}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatisticsCard
            title={t.totalExpenses}
            value={formatAmount(stats.total)}
            icon={DollarSign}
            color="text-primary-600 dark:text-primary-400"
          />
          <StatisticsCard
            title={t.totalTransactions}
            value={stats.count}
            icon={Receipt}
            color="text-purple-600 dark:text-purple-400"
          />
          <StatisticsCard
            title={t.averageExpense}
            value={formatAmount(stats.average)}
            icon={TrendingUp}
            color="text-green-600 dark:text-green-400"
          />
          <StatisticsCard
            title={t.categories}
            value={Object.keys(stats.byCategory).length}
            icon={Wallet}
            color="text-orange-600 dark:text-orange-400"
          />
        </div>

        {/* Add Expense Form */}
        <div className="mb-8">
          <ExpenseForm
            onAddExpense={handleAddExpense}
            onUpdateExpense={handleUpdateExpense}
            editingExpense={editingExpense}
            onCancelEdit={handleCancelEdit}
          />
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
        <ExpenseList
          expenses={sortedExpenses}
          onDelete={handleDeleteExpense}
          onEdit={handleEditExpense}
          onSort={handleSort}
        />

        {/* Clear All Button */}
        {expenses.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Button
              variant="danger"
              onClick={handleClearAll}
              className="min-w-[200px]"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t.clearAll}
            </Button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
            {t.footerText}
          </p>
        </div>
      </footer>
    </div>
  );
}
