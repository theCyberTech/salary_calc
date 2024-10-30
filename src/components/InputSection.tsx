import React from 'react';
import { FrequencyType, CurrencyType } from '../types/calculator';
import { AmountInput } from './inputs/AmountInput';
import { CustomDropdown } from './inputs/CustomDropdown';

interface InputSectionProps {
  amount: number;
  frequency: FrequencyType;
  currency: CurrencyType;
  onAmountChange: (amount: number) => void;
  onFrequencyChange: (frequency: FrequencyType) => void;
  onCurrencyChange: (currency: CurrencyType) => void;
}

export const InputSection: React.FC<InputSectionProps> = ({
  amount,
  frequency,
  currency,
  onAmountChange,
  onFrequencyChange,
  onCurrencyChange,
}) => {
  const frequencies: FrequencyType[] = ['hourly', 'daily', 'weekly', 'fortnightly', 'monthly', 'yearly'];
  const currencies: CurrencyType[] = ['USD', 'AUD'];

  return (
    <div className="grid gap-6 md:grid-cols-3 mb-8">
      <AmountInput value={amount} onChange={onAmountChange} />
      
      <CustomDropdown<CurrencyType>
        label="Currency"
        value={currency}
        options={currencies}
        onChange={onCurrencyChange}
      />

      <CustomDropdown<FrequencyType>
        label="Frequency"
        value={frequency}
        options={frequencies}
        onChange={onFrequencyChange}
        capitalize
      />
    </div>
  );
};