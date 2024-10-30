export type FrequencyType = 'hourly' | 'daily' | 'weekly' | 'fortnightly' | 'monthly' | 'yearly';
export type CurrencyType = 'USD' | 'AUD';

export interface SalaryValue {
  label: string;
  usd: number;
}

export interface Calculations {
  hourly: SalaryValue;
  daily: SalaryValue;
  weekly: SalaryValue;
  fortnightly: SalaryValue;
  monthly: SalaryValue;
  yearly: SalaryValue;
}

export interface TaxBreakdown {
  taxableIncome: number;
  superannuation: number;
  totalPackage: number;
  taxPayable: number;
  effectiveRate: number;
  marginalRate: number;
  takeHome: number;
}

export interface Expense {
  id: string;
  name: string;
  amount: number;
  frequency: FrequencyType;
}

export type TabType = 'calculator' | 'outgoings';