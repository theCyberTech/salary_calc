import React from 'react';
import { Plus, Trash2, Download, Upload } from 'lucide-react';
import { Expense, FrequencyType } from '../types/calculator';
import { exportToCSV, importFromCSV } from '../utils/fileHandlers';

interface OutgoingsCalculatorProps {
  expenses: Expense[];
  monthlyIncome: number;
  onAddExpense: () => void;
  onUpdateExpense: (id: string, field: keyof Expense, value: string | number) => void;
  onRemoveExpense: (id: string) => void;
  onSetExpenses: (expenses: Expense[]) => void;
}

export const OutgoingsCalculator: React.FC<OutgoingsCalculatorProps> = ({
  expenses,
  monthlyIncome,
  onAddExpense,
  onUpdateExpense,
  onRemoveExpense,
  onSetExpenses,
}) => {
  const getMonthlyAmount = (expense: Expense): number => {
    const amount = expense.amount;
    switch (expense.frequency) {
      case 'yearly': return amount / 12;
      case 'monthly': return amount;
      case 'fortnightly': return amount * 26 / 12;
      case 'weekly': return amount * 52 / 12;
      case 'daily': return amount * 365 / 12;
      case 'hourly': return amount * 8 * 22;
      default: return amount;
    }
  };

  const totalMonthlyExpenses = expenses.reduce((sum, expense) => 
    sum + getMonthlyAmount(expense), 0
  );

  const remainingMoney = monthlyIncome - totalMonthlyExpenses;
  const expenseRatio = (totalMonthlyExpenses / monthlyIncome) * 100;

  const handleSaveJSON = () => {
    const data = JSON.stringify(expenses, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'outgoings.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSaveCSV = () => {
    const csv = exportToCSV(expenses);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'outgoings.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLoad = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          if (file.name.endsWith('.json')) {
            const loadedExpenses = JSON.parse(content) as Expense[];
            onSetExpenses(loadedExpenses);
          } else if (file.name.endsWith('.csv')) {
            const loadedExpenses = importFromCSV(content);
            onSetExpenses(loadedExpenses);
          }
        } catch (error) {
          console.error('Error loading expenses:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#F1F6FA] p-4 rounded-lg">
          <div className="text-sm text-[#2B5D8C]">Monthly Income</div>
          <div className="text-xl font-semibold text-[#1E3D5C]">
            ${monthlyIncome.toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="bg-[#F1F6FA] p-4 rounded-lg">
          <div className="text-sm text-[#2B5D8C]">Monthly Expenses</div>
          <div className="text-xl font-semibold text-[#1E3D5C]">
            ${totalMonthlyExpenses.toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className={`p-4 rounded-lg ${remainingMoney >= 0 ? 'bg-[#E8F5E9]' : 'bg-[#FFEBEE]'}`}>
          <div className="text-sm text-[#2B5D8C]">Remaining</div>
          <div className={`text-xl font-semibold ${remainingMoney >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            ${remainingMoney.toLocaleString('en-US', { maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#B8D1E5] overflow-hidden">
        <div className="p-4 bg-[#F1F6FA] border-b border-[#B8D1E5] flex justify-between items-center">
          <h3 className="text-[#1E3D5C] font-semibold">Expenses</h3>
          <div className="flex gap-2">
            <input
              type="file"
              accept=".json,.csv"
              onChange={handleLoad}
              className="hidden"
              id="load-expenses"
            />
            <label
              htmlFor="load-expenses"
              className="flex items-center gap-2 px-3 py-1 rounded bg-[#2B5D8C] text-white text-sm hover:bg-[#1E3D5C] transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              Import
            </label>
            <div className="relative group">
              <button
                className="flex items-center gap-2 px-3 py-1 rounded bg-[#2B5D8C] text-white text-sm hover:bg-[#1E3D5C] transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <div className="absolute right-0 mt-1 w-32 py-2 bg-white rounded-lg shadow-lg border border-[#B8D1E5] hidden group-hover:block">
                <button
                  onClick={handleSaveJSON}
                  className="w-full px-4 py-1 text-left text-sm text-[#2B5D8C] hover:bg-[#F1F6FA]"
                >
                  JSON
                </button>
                <button
                  onClick={handleSaveCSV}
                  className="w-full px-4 py-1 text-left text-sm text-[#2B5D8C] hover:bg-[#F1F6FA]"
                >
                  CSV
                </button>
              </div>
            </div>
            <button
              onClick={onAddExpense}
              className="flex items-center gap-2 px-3 py-1 rounded bg-[#2B5D8C] text-white text-sm hover:bg-[#1E3D5C] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Expense
            </button>
          </div>
        </div>
        <div className="divide-y divide-[#B8D1E5]">
          {expenses.map((expense) => (
            <div key={expense.id} className="p-4 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-4">
                <input
                  type="text"
                  value={expense.name}
                  onChange={(e) => onUpdateExpense(expense.id, 'name', e.target.value)}
                  placeholder="Expense name"
                  className="w-full px-3 py-2 border border-[#B8D1E5] rounded-lg focus:ring-2 focus:ring-[#2B5D8C] focus:border-[#2B5D8C]"
                />
              </div>
              <div className="col-span-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#2B5D8C]">$</span>
                  <input
                    type="number"
                    value={expense.amount}
                    onChange={(e) => onUpdateExpense(expense.id, 'amount', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-2 border border-[#B8D1E5] rounded-lg focus:ring-2 focus:ring-[#2B5D8C] focus:border-[#2B5D8C]"
                  />
                </div>
              </div>
              <div className="col-span-3">
                <select
                  value={expense.frequency}
                  onChange={(e) => onUpdateExpense(expense.id, 'frequency', e.target.value as FrequencyType)}
                  className="w-full px-3 py-2 border border-[#B8D1E5] rounded-lg focus:ring-2 focus:ring-[#2B5D8C] focus:border-[#2B5D8C]"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="fortnightly">Fortnightly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div className="col-span-2 text-right">
                <button
                  onClick={() => onRemoveExpense(expense.id)}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {expenses.length === 0 && (
            <div className="p-8 text-center text-[#2B5D8C]">
              No expenses added yet. Click the "Add Expense" button to get started.
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#F1F6FA] p-4 rounded-lg">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-[#2B5D8C]">Expense Ratio</span>
          <span className="text-sm font-medium text-[#1E3D5C]">
            {expenseRatio.toFixed(1)}%
          </span>
        </div>
        <div className="w-full bg-[#B8D1E5] rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              expenseRatio > 100
                ? 'bg-red-500'
                : expenseRatio > 80
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(expenseRatio, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};