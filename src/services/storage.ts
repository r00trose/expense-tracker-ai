import fs from 'fs/promises';
import path from 'path';
import type { Expense } from '../types/expense.js';

export class ExpenseStorage {
  private dataPath: string;

  constructor(dataPath = './data/expenses.json') {
    this.dataPath = dataPath;
  }

  async initialize(): Promise<void> {
    const dir = path.dirname(this.dataPath);
    await fs.mkdir(dir, { recursive: true });

    try {
      await fs.access(this.dataPath);
    } catch {
      await fs.writeFile(this.dataPath, JSON.stringify([], null, 2));
    }
  }

  async save(expense: Expense): Promise<void> {
    const expenses = await this.loadAll();
    expenses.push(expense);
    await fs.writeFile(this.dataPath, JSON.stringify(expenses, null, 2));
  }

  async loadAll(): Promise<Expense[]> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      const expenses = JSON.parse(data);
      return expenses.map((e: any) => ({
        ...e,
        date: new Date(e.date),
      }));
    } catch {
      return [];
    }
  }

  async findById(id: string): Promise<Expense | null> {
    const expenses = await this.loadAll();
    return expenses.find((e) => e.id === id) || null;
  }

  async deleteById(id: string): Promise<boolean> {
    const expenses = await this.loadAll();
    const filtered = expenses.filter((e) => e.id !== id);
    if (filtered.length === expenses.length) {
      return false;
    }
    await fs.writeFile(this.dataPath, JSON.stringify(filtered, null, 2));
    return true;
  }

  async update(id: string, updates: Partial<Expense>): Promise<Expense | null> {
    const expenses = await this.loadAll();
    const index = expenses.findIndex((e) => e.id === id);
    if (index === -1) {
      return null;
    }
    expenses[index] = { ...expenses[index], ...updates };
    await fs.writeFile(this.dataPath, JSON.stringify(expenses, null, 2));
    return expenses[index];
  }
}
