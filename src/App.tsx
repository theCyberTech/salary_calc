import React, { useState } from 'react';
import { FrequencyType, TabType, Expense, CurrencyType } from './types/calculator';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ResultsTable } from './components/ResultsTable';
import { TaxTable } from './components/TaxTable';
import { ExchangeRate } from './components/ExchangeRate';
import { TabNavigation } from './components/TabNavigation';
import { OutgoingsCalculator } from './components/OutgoingsCalculator';
import { calculateSalaries } from './utils/calculations';
import { calculateAustralianTax } from './utils/taxCalculator';

function App() {
  const [amount, setAmount] = useState<number>(100000);
  const [frequency, setFrequency] = useState<FrequencyType>('yearly');
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  const [exchangeRate] = useState<number>(1.51);
  const [activeTab, setActiveTab] = useState<TabType>('calculator');
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const calculations = calculateSalaries(amount, frequency);
  const yearlyAmount = currency === 'USD' ? calculations.yearly.usd * exchangeRate : calculations.yearly.usd;
  const taxInfo = calculateAustralianTax(yearlyAmount);
  const monthlyPostTaxIncome = taxInfo.takeHome / 12;

  const handleAddExpense = () => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      name: '',
      amount: 0,
      frequency: 'monthly',
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleUpdateExpense = (id: string, field: keyof Expense, value: string | number) => {
    setExpenses(expenses.map(expense =>
      expense.id === id ? { ...expense, [field]: value } : expense
    ));
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-primary-200">
          <Header />
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          
          {activeTab === 'calculator' ? (
            <>
              <InputSection
                amount={amount}
                frequency={frequency}
                currency={currency}
                onAmountChange={setAmount}
                onFrequencyChange={setFrequency}
                onCurrencyChange={setCurrency}
              />
              <ResultsTable
                calculations={calculations}
                exchangeRate={exchangeRate}
                sourceCurrency={currency}
              />
              <TaxTable taxInfo={taxInfo} />
            </>
          ) : (
            <OutgoingsCalculator
              expenses={expenses}
              monthlyIncome={monthlyPostTaxIncome}
              onAddExpense={handleAddExpense}
              onUpdateExpense={handleUpdateExpense}
              onRemoveExpense={handleRemoveExpense}
              onSetExpenses={setExpenses}
            />
          )}
        </div>
        <ExchangeRate rate={exchangeRate} sourceCurrency={currency} />
      </div>
    </div>
  );
}

export default App;