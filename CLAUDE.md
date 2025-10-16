# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Expense Tracker AI is a TypeScript-based application that uses Anthropic's Claude API to parse natural language expense entries and provide intelligent spending analysis. The project stores expense data locally in JSON format.

## Development Commands

### Setup
```bash
npm install                 # Install dependencies
cp .env.example .env       # Create environment file (add ANTHROPIC_API_KEY)
```

### Development
```bash
npm run dev                # Run with hot reload (tsx watch)
npm run build              # Compile TypeScript to dist/
npm start                  # Run compiled JavaScript
npm run type-check         # Type check without emitting files
```

### Testing
```bash
npm test                   # Run tests with Vitest
npm run test:watch         # Run tests in watch mode
npm run test:ui            # Open Vitest UI
```

### Code Quality
```bash
npm run lint               # Lint with ESLint
npm run lint:fix           # Fix linting issues
npm run format             # Format with Prettier
npm run format:check       # Check formatting
```

## Architecture

### Service-Oriented Design

The application follows a clean separation of concerns:

1. **Services** (`src/services/`):
   - `AIExpenseParser`: Integrates with Anthropic's Claude API to parse natural language input and analyze spending patterns. Uses Claude 3.5 Sonnet model.
   - `ExpenseStorage`: Handles JSON file-based persistence in `data/expenses.json`. Provides CRUD operations for expenses.

2. **Types** (`src/types/`):
   - `expense.ts`: Core expense data structures (`Expense`, `ExpenseInput`, `ExpenseCategory`)
   - `ai.ts`: AI-related types (`AIParseResult`, `AIAnalysisResult`)

3. **Utils** (`src/utils/`):
   - `validators.ts`: Input validation and currency formatting utilities

4. **Main Class** (`src/index.ts`):
   - `ExpenseTracker`: Orchestrates all services and provides high-level API

### Data Flow

1. **Natural Language Input** → `AIExpenseParser.parseExpense()` → Structured expense data
2. **Structured Data** → `ExpenseStorage.save()` → JSON persistence
3. **Analysis Request** → Load expenses → `AIExpenseParser.analyzeSpending()` → Insights

### AI Integration Details

The `AIExpenseParser` uses structured prompts to:
- Extract expense details (description, amount, category, date, tags) from natural language
- Categorize expenses into predefined categories (food, transportation, entertainment, utilities, shopping, healthcare, education, other)
- Analyze spending patterns and provide actionable insights

Responses are expected in JSON format and parsed with error handling.

### Storage Architecture

Expenses are stored in `data/expenses.json` as an array of `Expense` objects. The `ExpenseStorage` class:
- Auto-creates the data directory and file if they don't exist
- Converts date strings to `Date` objects when loading
- Provides atomic read/write operations (entire file is read/written each time)

**Note**: This storage approach works for small-to-medium datasets but may need optimization for large expense histories (consider streaming or database migration).

## Configuration

- **Environment Variables**: Set `ANTHROPIC_API_KEY` in `.env` (required)
- **TypeScript**: ES2022 target, ESNext modules, strict mode enabled
- **Module System**: ESM (note the `.js` extensions in imports despite being TypeScript)

## Testing Strategy

Tests use Vitest and are colocated with source files using `.test.ts` suffix. Focus on:
- Validator logic
- Storage operations (consider mocking file system)
- AI parser (mock Anthropic API responses to avoid API costs)

## Key Implementation Notes

1. **Import Extensions**: Always use `.js` extensions in imports even for `.ts` files (ESM requirement)
2. **API Key Security**: Never commit `.env` file; use `.env.example` as template
3. **Date Handling**: Dates are stored as ISO strings in JSON but converted to `Date` objects in memory
4. **Error Handling**: AI parsing failures should be caught and handled gracefully
5. **Type Safety**: Strict TypeScript enabled; avoid `any` types where possible
