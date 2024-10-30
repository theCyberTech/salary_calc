import React from 'react';
import { Calculations, SalaryValue, CurrencyType } from '../types/calculator';
import { calculatePostTaxAmount } from '../utils/taxCalculator';

interface ResultsTableProps {
  calculations: Calculations;
  exchangeRate: number;
  sourceCurrency: CurrencyType;
}

interface TableHeaderProps {
  values: SalaryValue[];
}

interface TableRowProps {
  label: string;
  values: SalaryValue[];
  getValue: (value: number, frequency: string) => number;
  highlight?: boolean;
}

const TableHeader: React.FC<TableHeaderProps> = ({ values }) => (
  <tr className="bg-[#F1F6FA]">
    <th className="px-6 py-3 text-left text-xs font-medium text-[#2B5D8C] uppercase tracking-wider">
      Currency
    </th>
    {values.map(({ label }) => (
      <th
        key={`header-${label.toLowerCase()}`}
        className="px-6 py-3 text-left text-xs font-medium text-[#2B5D8C] uppercase tracking-wider"
      >
        {label}
      </th>
    ))}
  </tr>
);

const TableRow: React.FC<TableRowProps> = ({ label, values, getValue, highlight }) => (
  <tr className={`hover:bg-[#F8FAFC] ${highlight ? 'bg-[#F1F6FA]' : ''}`}>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1E3D5C]">
      {label}
    </td>
    {values.map(({ label, usd }) => (
      <td
        key={`${label.toLowerCase()}-${label}`}
        className="px-6 py-4 whitespace-nowrap text-sm text-[#2B5D8C]"
      >
        ${getValue(usd, label.toLowerCase()).toLocaleString('en-US', { maximumFractionDigits: 2 })}
      </td>
    ))}
  </tr>
);

export const ResultsTable: React.FC<ResultsTableProps> = ({ calculations, exchangeRate, sourceCurrency }) => {
  const values = Object.values(calculations);

  const getYearlyMultiplier = (frequency: string): number => {
    switch (frequency) {
      case 'hourly': return 8 * 5 * 52; // hours per day * days per week * weeks per year
      case 'daily': return 5 * 52; // days per week * weeks per year
      case 'weekly': return 52; // weeks per year
      case 'fortnightly': return 26; // fortnights per year
      case 'monthly': return 12; // months per year
      case 'yearly': return 1;
      default: return 1;
    }
  };

  const getUSDValue = (value: number): number => {
    return sourceCurrency === 'AUD' ? value / exchangeRate : value;
  };

  const getAUDValue = (value: number): number => {
    return sourceCurrency === 'USD' ? value * exchangeRate : value;
  };

  const getPostTaxValue = (value: number, frequency: string): number => {
    const yearlyUSD = getUSDValue(value) * getYearlyMultiplier(frequency);
    const yearlyAUD = yearlyUSD * (sourceCurrency === 'USD' ? exchangeRate : 1);
    const yearlyPostTax = calculatePostTaxAmount(yearlyAUD);
    return yearlyPostTax / getYearlyMultiplier(frequency);
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-[#B8D1E5]">
      <table className="w-full">
        <thead>
          <TableHeader values={values} />
        </thead>
        <tbody className="bg-white divide-y divide-[#B8D1E5]">
          <TableRow
            label="USD"
            values={values}
            getValue={(value) => getUSDValue(value)}
          />
          <TableRow
            label="AUD (Pre-tax)"
            values={values}
            getValue={(value) => getAUDValue(value)}
          />
          <TableRow
            label="AUD (Post-tax)"
            values={values}
            getValue={getPostTaxValue}
            highlight
          />
        </tbody>
      </table>
    </div>
  );
};