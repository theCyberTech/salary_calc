import { TaxBreakdown } from '../types/calculator';

const TAX_BRACKETS = [
  { min: 0, max: 18200, rate: 0, base: 0 },
  { min: 18201, max: 45000, rate: 0.19, base: 0 },
  { min: 45001, max: 120000, rate: 0.325, base: 5092 },
  { min: 120001, max: 180000, rate: 0.37, base: 29467 },
  { min: 180001, max: Infinity, rate: 0.45, base: 51667 },
];

export function calculateAustralianTax(income: number): TaxBreakdown {
  const superannuation = income * 0.115;
  const totalPackage = income + superannuation;

  let taxPayable = 0;
  let marginalRate = 0;

  for (const bracket of TAX_BRACKETS) {
    if (income > bracket.min) {
      const taxableAmount = Math.min(income - bracket.min, bracket.max - bracket.min);
      taxPayable = bracket.base + (taxableAmount * bracket.rate);
      marginalRate = bracket.rate * 100;
    }
  }

  const effectiveRate = (taxPayable / income) * 100;
  const takeHome = income - taxPayable;

  return {
    taxableIncome: income,
    superannuation,
    totalPackage,
    taxPayable,
    effectiveRate,
    marginalRate,
    takeHome,
  };
}

export function calculatePostTaxAmount(amount: number): number {
  return calculateAustralianTax(amount).takeHome;
}