import type { TranslationKeys } from './en';

export const tr: TranslationKeys = {
  // Header
  appName: 'Harcama Takipçisi',
  appSubtitle: 'Finanslarınızı kolayca yönetin',
  exportCSV: 'CSV Olarak Dışa Aktar',

  // Statistics
  totalExpenses: 'Toplam Harcama',
  totalTransactions: 'Toplam İşlem',
  averageExpense: 'Ortalama Harcama',
  categories: 'Kategoriler',

  // Form
  addNewExpense: 'Yeni Harcama Ekle',
  updateExpense: 'Harcamayı Güncelle',
  description: 'Açıklama',
  descriptionPlaceholder: 'örn., Market alışverişi',
  amount: 'Tutar',
  category: 'Kategori',
  date: 'Tarih',
  paymentMethod: 'Ödeme Yöntemi',
  addExpense: 'Harcama Ekle',
  adding: 'Ekleniyor...',
  updating: 'Güncelleniyor...',
  cancelEdit: 'İptal',

  // Categories
  food: 'Yemek ve İçecek',
  transportation: 'Ulaşım',
  entertainment: 'Eğlence',
  utilities: 'Faturalar',
  shopping: 'Alışveriş',
  healthcare: 'Sağlık',
  education: 'Eğitim',
  other: 'Diğer',

  // Payment Methods
  cash: 'Nakit',
  creditCard: 'Kredi Kartı',
  debitCard: 'Banka Kartı',
  bankTransfer: 'Havale/EFT',
  digitalWallet: 'Dijital Cüzdan',

  // Filters
  filters: 'Filtreler',
  allCategories: 'Tüm Kategoriler',
  allPaymentMethods: 'Tüm Ödeme Yöntemleri',
  startDate: 'Başlangıç Tarihi',
  endDate: 'Bitiş Tarihi',
  searchPlaceholder: 'Harcama ara...',
  resetFilters: 'Filtreleri Sıfırla',

  // Expense List
  noExpenses: 'Harcama bulunamadı',
  noExpensesDescription: 'İlk harcamanızı ekleyerek başlayın veya filtrelerinizi ayarlayın.',
  expense: 'Harcama',
  expenses: 'Harcama',
  sortByDate: 'Tarih',
  sortByAmount: 'Tutar',
  sortByCategory: 'Kategori',

  // Actions
  edit: 'Düzenle',
  delete: 'Sil',
  clearAll: 'Tüm Verileri Sil',

  // Confirmations
  deleteConfirm: 'Bu harcamayı silmek istediğinizden emin misiniz?',
  clearAllConfirm: 'Bu işlem TÜM harcamaları silecektir. Bu işlem geri alınamaz. Emin misiniz?',
  clearAllSecondConfirm: 'KESINLIKLE emin misiniz? Onaylamak için "SIL" yazın.',

  // Charts
  categoryBreakdown: 'Kategori Dağılımı',
  expenseTrend: 'Harcama Trendi',
  paymentMethodBreakdown: 'Ödeme Yöntemleri',
  monthlyExpenses: 'Aylık Harcamalar',
  last6Months: 'Son 6 Ay',

  // Footer
  footerText: 'Next.js, TypeScript ve Tailwind CSS ile geliştirilmiştir',

  // Theme
  lightMode: 'Açık Tema',
  darkMode: 'Koyu Tema',

  // Currency
  selectCurrency: 'Para Birimi Seç',

  // Language
  selectLanguage: 'Dil Seç',
  turkish: 'Türkçe',
  english: 'İngilizce',
};
