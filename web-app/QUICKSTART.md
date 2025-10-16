# Quick Start Guide

## Running the Application

1. **Navigate to the web-app directory:**
   ```bash
   cd /Users/irlinya/Desktop/expense-tracker-ai/web-app
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open in your browser:**
   ```
   http://localhost:3000
   ```

## Using the Application

### Adding an Expense
1. Fill in the form at the top of the page
2. All fields are required:
   - **Description**: What you spent money on (e.g., "Grocery shopping")
   - **Amount**: How much you spent (e.g., 45.99)
   - **Category**: Choose from 8 categories
   - **Date**: When the expense occurred
   - **Payment Method**: How you paid
3. Click "Add Expense"

### Filtering Expenses
Use the filters section to narrow down your expenses:
- **Search**: Type to search in descriptions and amounts
- **Category**: Filter by expense category
- **Payment Method**: Filter by how you paid
- **Date Range**: Set start and end dates
- **Clear All**: Reset all filters

### Sorting Expenses
Click the sort buttons to organize your list:
- **Date**: Sort by newest or oldest
- **Amount**: Sort by highest or lowest
- **Category**: Sort alphabetically

### Viewing Statistics
The dashboard shows:
- **Total Expenses**: Sum of all your expenses
- **Total Transactions**: Number of expenses
- **Average Expense**: Mean amount per transaction
- **Categories**: Number of different categories used

### Charts & Breakdowns
- **Category Breakdown**: See spending by category with percentages
- **Spending Trend**: View your monthly spending over time
- **Payment Methods**: See which payment methods you use most

### Exporting Data
- Click "Export CSV" in the header to download your expenses
- The CSV includes all filtered expenses
- Open in Excel, Google Sheets, or any spreadsheet app

### Deleting Expenses
- Hover over an expense in the list
- Click the trash icon that appears
- Confirm the deletion

## Features at a Glance

✅ **Add expenses** - Quick and easy form with validation
✅ **Filter & search** - Find expenses quickly
✅ **Sort** - Organize by date, amount, or category
✅ **Statistics** - See your spending patterns
✅ **Charts** - Visual breakdown of expenses
✅ **Export** - Download to CSV
✅ **Responsive** - Works on phone, tablet, and desktop
✅ **Fast** - Instant updates, no page reloads
✅ **Private** - All data stored locally in your browser

## Tips

- **Use descriptive names**: "Walmart groceries" is better than "Store"
- **Be consistent**: Use the same categories for similar expenses
- **Regular updates**: Add expenses as they happen for accuracy
- **Weekly reviews**: Check your spending trends regularly
- **Export often**: Keep backups of your data

## Troubleshooting

**Data not saving?**
- Check if your browser allows LocalStorage
- Try a different browser
- Clear browser cache and reload

**Stats not updating?**
- Refresh the page
- Check if you have active filters

**Export not working?**
- Make sure you have at least one expense
- Try a different browser
- Check browser download settings

## Keyboard Shortcuts

- `Tab` - Navigate between form fields
- `Enter` - Submit the form
- `Esc` - Clear search/filters (when focused)

Enjoy tracking your expenses! 🎉
