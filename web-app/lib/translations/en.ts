export const en = {
  // Header
  appName: 'Expense Tracker',
  appSubtitle: 'Manage your finances with ease',
  exportCSV: 'Export CSV',

  // Statistics
  totalExpenses: 'Total Expenses',
  totalTransactions: 'Total Transactions',
  averageExpense: 'Average Expense',
  categories: 'Categories',

  // Form
  addNewExpense: 'Add New Expense',
  updateExpense: 'Update Expense',
  description: 'Description',
  descriptionPlaceholder: 'e.g., Grocery shopping',
  amount: 'Amount',
  category: 'Category',
  date: 'Date',
  paymentMethod: 'Payment Method',
  addExpense: 'Add Expense',
  adding: 'Adding...',
  updating: 'Updating...',
  cancelEdit: 'Cancel',

  // Categories
  food: 'Food & Dining',
  transportation: 'Transportation',
  entertainment: 'Entertainment',
  utilities: 'Utilities',
  shopping: 'Shopping',
  healthcare: 'Healthcare',
  education: 'Education',
  other: 'Other',

  // Payment Methods
  cash: 'Cash',
  creditCard: 'Credit Card',
  debitCard: 'Debit Card',
  bankTransfer: 'Bank Transfer',
  digitalWallet: 'Digital Wallet',

  // Filters
  filters: 'Filters',
  allCategories: 'All Categories',
  allPaymentMethods: 'All Payment Methods',
  startDate: 'Start Date',
  endDate: 'End Date',
  searchPlaceholder: 'Search expenses...',
  resetFilters: 'Reset Filters',

  // Expense List
  noExpenses: 'No expenses found',
  noExpensesDescription: 'Start by adding your first expense or adjust your filters.',
  expense: 'Expense',
  expenses: 'Expenses',
  sortByDate: 'Date',
  sortByAmount: 'Amount',
  sortByCategory: 'Category',

  // Actions
  edit: 'Edit',
  delete: 'Delete',
  clearAll: 'Clear All Data',

  // Confirmations
  deleteConfirm: 'Are you sure you want to delete this expense?',
  clearAllConfirm: 'This will delete ALL expenses. This action cannot be undone. Are you sure?',
  clearAllSecondConfirm: 'Are you ABSOLUTELY sure? Type "DELETE" to confirm.',

  // Charts
  categoryBreakdown: 'Category Breakdown',
  expenseTrend: 'Expense Trend',
  paymentMethodBreakdown: 'Payment Methods',
  monthlyExpenses: 'Monthly Expenses',
  last6Months: 'Last 6 Months',

  // Footer
  footerText: 'Built with Next.js, TypeScript, and Tailwind CSS',

  // Theme
  lightMode: 'Light Mode',
  darkMode: 'Dark Mode',

  // Currency
  selectCurrency: 'Select Currency',

  // Language
  selectLanguage: 'Select Language',
  turkish: 'Turkish',
  english: 'English',
};

export type TranslationKeys = typeof en;
