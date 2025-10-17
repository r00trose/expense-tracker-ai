# Expense Tracker AI

An AI-powered expense tracking application that uses Claude to parse natural language expense entries and provide intelligent spending analysis.

## Features

- **Natural Language Input**: Add expenses using plain English (e.g., "Lunch at cafe $25")
- **AI-Powered Parsing**: Automatically extracts amount, category, date, and tags
- **Spending Analysis**: Get AI-generated insights about your spending patterns
- **Local Storage**: All data stored locally in JSON format
- **TypeScript**: Fully typed for better developer experience

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment:
```bash
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

3. Run the application:
```bash
npm run dev
```

## Usage

```typescript
import { ExpenseTracker } from './src/index.js';

const tracker = new ExpenseTracker();
await tracker.initialize();

// Add expense using natural language
const expense = await tracker.addExpenseFromNaturalLanguage(
  'Coffee at Starbucks $6.50 this morning'
);

// Add expense manually
await tracker.addExpense({
  description: 'Grocery shopping',
  amount: 125.50,
  category: 'food',
  date: new Date(),
});

// Get spending analysis
const analysis = await tracker.analyzeSpending();
console.log(analysis.summary);
console.log(analysis.insights);

// Print summary
await tracker.printSummary();
```

## Development

- `npm run dev` - Run with hot reload
- `npm run build` - Build TypeScript
- `npm test` - Run tests
- `npm run lint` - Lint code
- `npm run format` - Format code

## Architecture

The application follows a service-oriented architecture:

- **Services Layer**: AIExpenseParser for AI integration, ExpenseStorage for data persistence
- **Types Layer**: Shared TypeScript interfaces and types
- **Utils Layer**: Validation and formatting utilities
- **Main Class**: ExpenseTracker orchestrates all services

