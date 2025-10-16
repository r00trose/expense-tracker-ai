import { describe, it, expect } from 'vitest';
import { validateExpenseInput, formatCurrency } from './validators.js';

describe('validateExpenseInput', () => {
  it('should validate a valid expense input', () => {
    const result = validateExpenseInput({
      description: 'Lunch',
      amount: 25.5,
      category: 'food',
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject empty description', () => {
    const result = validateExpenseInput({
      description: '',
      amount: 25.5,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Description is required');
  });

  it('should reject negative amounts', () => {
    const result = validateExpenseInput({
      description: 'Lunch',
      amount: -10,
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Amount must be a positive number');
  });
});

describe('formatCurrency', () => {
  it('should format USD currency correctly', () => {
    expect(formatCurrency(25.5)).toBe('$25.50');
    expect(formatCurrency(1000)).toBe('$1,000.00');
  });
});
