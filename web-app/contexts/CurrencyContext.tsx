'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Currency, CurrencyInfo } from '@/types/settings';

interface CurrencyContextType {
  currency: Currency;
  currencyInfo: CurrencyInfo;
  setCurrency: (currency: Currency) => void;
  formatAmount: (amount: number) => string;
}

const CURRENCIES: Record<Currency, CurrencyInfo> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
  TRY: { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('TRY');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load currency from localStorage
    const savedCurrency = localStorage.getItem('expense-tracker-currency') as Currency;
    if (savedCurrency && CURRENCIES[savedCurrency]) {
      setCurrencyState(savedCurrency);
    } else {
      // Default to TRY
      setCurrencyState('TRY');
    }
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('expense-tracker-currency', newCurrency);
  };

  const formatAmount = (amount: number): string => {
    const currencyInfo = CURRENCIES[currency];
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
    }).format(amount);
  };

  if (!mounted) {
    return null;
  }

  const currencyInfo = CURRENCIES[currency];

  return (
    <CurrencyContext.Provider value={{ currency, currencyInfo, setCurrency, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

export { CURRENCIES };
