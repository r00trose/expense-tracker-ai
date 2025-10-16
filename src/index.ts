import { config } from 'dotenv';
import { randomUUID } from 'crypto';
import { ExpenseStorage } from './services/storage.js';
import { AIExpenseParser } from './services/ai-parser.js';
import { validateExpenseInput, formatCurrency } from './utils/validators.js';
import type { Expense } from './types/expense.js';

config();

export class ExpenseTracker {
  private storage: ExpenseStorage;
  private aiParser: AIExpenseParser;

  constructor() {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY environment variable is required');
    }

    this.storage = new ExpenseStorage();
    this.aiParser = new AIExpenseParser(apiKey);
  }

  async initialize(): Promise<void> {
    await this.storage.initialize();
  }

  async addExpenseFromNaturalLanguage(input: string): Promise<Expense> {
    const parsed = await this.aiParser.parseExpense(input);

    const expense: Expense = {
      id: randomUUID(),
      description: parsed.description,
      amount: parsed.amount,
      category: parsed.category,
      date: parsed.date,
      tags: parsed.tags,
      metadata: {
        confidence: parsed.confidence,
      },
    };

    await this.storage.save(expense);
    return expense;
  }

  async addExpense(input: {
    description: string;
    amount: number;
    category: string;
    date?: Date;
  }): Promise<Expense> {
    const validation = validateExpenseInput(input);
    if (!validation.isValid) {
      throw new Error(`Invalid expense input: ${validation.errors.join(', ')}`);
    }

    const expense: Expense = {
      id: randomUUID(),
      description: input.description,
      amount: input.amount,
      category: input.category,
      date: input.date || new Date(),
    };

    await this.storage.save(expense);
    return expense;
  }

  async getAllExpenses(): Promise<Expense[]> {
    return this.storage.loadAll();
  }

  async getExpenseById(id: string): Promise<Expense | null> {
    return this.storage.findById(id);
  }

  async deleteExpense(id: string): Promise<boolean> {
    return this.storage.deleteById(id);
  }

  async analyzeSpending(): Promise<{ summary: string; insights: string[] }> {
    const expenses = await this.storage.loadAll();
    const expenseData = expenses.map((e) => ({
      category: e.category,
      amount: e.amount,
      date: e.date,
    }));

    return this.aiParser.analyzeSpending(expenseData);
  }

  async printSummary(): Promise<void> {
    const expenses = await this.getAllExpenses();
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);

    console.log('\n=== Expense Summary ===');
    console.log(`Total Expenses: ${formatCurrency(total)}`);
    console.log(`Number of Transactions: ${expenses.length}`);

    const byCategory = expenses.reduce(
      (acc, e) => {
        acc[e.category] = (acc[e.category] || 0) + e.amount;
        return acc;
      },
      {} as Record<string, number>
    );

    console.log('\nBy Category:');
    Object.entries(byCategory)
      .sort(([, a], [, b]) => b - a)
      .forEach(([category, amount]) => {
        console.log(`  ${category}: ${formatCurrency(amount)}`);
      });
  }
}

// Example usage
async function main(): Promise<void> {
  const tracker = new ExpenseTracker();
  await tracker.initialize();

  console.log('Expense Tracker AI initialized!');
  console.log('\nExample usage:');
  console.log('- Add expense: tracker.addExpenseFromNaturalLanguage("Lunch at cafe $25")');
  console.log('- View all: tracker.getAllExpenses()');
  console.log('- Analyze: tracker.analyzeSpending()');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { ExpenseStorage } from './services/storage.js';
export { AIExpenseParser } from './services/ai-parser.js';
export * from './types/expense.js';
export * from './types/ai.js';
