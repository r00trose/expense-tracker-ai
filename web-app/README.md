# Expense Tracker Web Application

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Core Functionality
- ✅ Add expenses with description, amount, category, date, and payment method
- ✅ View all expenses in a clean, organized list
- ✅ Filter expenses by category, date range, payment method, and search term
- ✅ Sort expenses by date, amount, or category
- ✅ Delete expenses with confirmation
- ✅ Export data to CSV format

### Statistics & Analytics
- 📊 Total expenses, transaction count, and average expense
- 📈 Category breakdown with visual progress bars
- 📉 Monthly spending trends (last 6 months)
- 💳 Payment method breakdown
- 🎯 Real-time statistics updates

### Design & UX
- 🎨 Modern, clean UI with professional color scheme
- 📱 Fully responsive (mobile, tablet, desktop)
- ✨ Smooth animations and transitions
- ♿ Accessible design with ARIA labels
- 🔍 Intuitive filtering and sorting
- 💾 Local storage persistence

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **State Management**: React Hooks
- **Storage**: Browser LocalStorage

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the web-app directory:
```bash
cd web-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
web-app/
├── app/                    # Next.js app router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Card.tsx
│   ├── ExpenseForm.tsx
│   ├── ExpenseList.tsx
│   ├── ExpenseItem.tsx
│   ├── ExpenseFilters.tsx
│   ├── StatisticsCard.tsx
│   ├── CategoryBreakdown.tsx
│   ├── ExpenseTrend.tsx
│   └── PaymentMethodBreakdown.tsx
├── lib/                   # Utility functions
│   ├── storage.ts        # LocalStorage operations
│   ├── filters.ts        # Filtering and sorting logic
│   ├── statistics.ts     # Statistics calculations
│   ├── validation.ts     # Form validation
│   ├── export.ts         # CSV export
│   ├── constants.ts      # App constants
│   └── utils.ts          # Helper utilities
├── types/                 # TypeScript types
│   └── expense.ts
└── package.json
```

## Key Features Explained

### Form Validation
The application includes comprehensive form validation:
- Required fields validation
- Amount range validation (0 - 1,000,000)
- Description length validation (3-100 characters)
- Date validation (no future dates)
- Real-time error messages

### Filtering System
Advanced filtering capabilities:
- Search by description or amount
- Filter by category (8 categories)
- Filter by payment method (5 methods)
- Date range filtering
- Combine multiple filters
- Clear all filters with one click

### Sorting
Sort expenses by:
- Date (newest/oldest first)
- Amount (highest/lowest first)
- Category (alphabetical)
- Description (alphabetical)

### Statistics
Real-time calculations:
- Total spent across all expenses
- Number of transactions
- Average expense amount
- Category-wise breakdown with percentages
- Payment method distribution
- Monthly trend analysis

### Data Export
Export filtered expenses to CSV:
- Includes date, description, amount, category, payment method
- Formatted for spreadsheet applications
- Automatic filename with current date

## Customization

### Categories
Edit `lib/constants.ts` to modify expense categories:
```typescript
export const EXPENSE_CATEGORIES = [
  { value: 'food', label: 'Food & Dining', color: 'bg-orange-500' },
  // Add more categories...
];
```

### Payment Methods
Edit `lib/constants.ts` to modify payment methods:
```typescript
export const PAYMENT_METHODS = [
  { value: 'cash', label: 'Cash' },
  // Add more methods...
];
```

### Color Scheme
Modify `tailwind.config.ts` to change the color palette:
```typescript
colors: {
  primary: {
    // Your custom colors
  }
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## LocalStorage

Data is stored in browser LocalStorage under the key `expense-tracker-data`. To clear all data:
1. Open browser DevTools
2. Go to Application > LocalStorage
3. Delete the `expense-tracker-data` key

Or use the browser's clear browsing data feature.

## Performance

- Optimized with Next.js static generation
- Lazy loading of components
- Memoized calculations for statistics
- Efficient re-renders with React hooks
- Small bundle size (~102 kB First Load JS)

## Future Enhancements

Potential features for future versions:
- Dark mode support
- Multiple currency support
- Budget tracking and alerts
- Recurring expenses
- Data import from CSV
- Charts and graphs
- Mobile app version
- Cloud sync
- Receipt image uploads
- AI-powered expense categorization

## License

MIT

## Author

Built with Next.js 14, TypeScript, and Tailwind CSS
