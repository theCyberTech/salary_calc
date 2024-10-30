import { Expense, FrequencyType } from '../types/calculator';

export const exportToCSV = (expenses: Expense[]): string => {
  const headers = ['Name', 'Amount', 'Frequency'];
  const rows = expenses.map(expense => [
    `"${expense.name}"`,
    expense.amount,
    expense.frequency
  ]);
  
  return [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
};

export const importFromCSV = (content: string): Expense[] => {
  const lines = content.split('\n').filter(line => line.trim());
  const expenses: Expense[] = [];
  
  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values = line.split(',');
    
    if (values.length >= 3) {
      const name = values[0].replace(/^"|"$/g, '');
      const amount = parseFloat(values[1]);
      const frequency = values[2] as FrequencyType;
      
      if (!isNaN(amount)) {
        expenses.push({
          id: crypto.randomUUID(),
          name,
          amount,
          frequency
        });
      }
    }
  }
  
  return expenses;
};