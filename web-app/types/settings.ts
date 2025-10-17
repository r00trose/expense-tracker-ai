export type Theme = 'light' | 'dark';
export type Currency = 'TRY' | 'USD' | 'EUR' | 'GBP';
export type Language = 'tr' | 'en';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
}

export interface AppSettings {
  theme: Theme;
  currency: Currency;
  language: Language;
}

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  TRY: '₺',
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
];

export const DEFAULT_SETTINGS: AppSettings = {
  theme: 'light',
  currency: 'TRY',
  language: 'tr',
};
