import React from 'react';
import { RefreshCcw } from 'lucide-react';
import { CurrencyType } from '../types/calculator';

interface ExchangeRateProps {
  rate: number;
  sourceCurrency: CurrencyType;
}

export const ExchangeRate: React.FC<ExchangeRateProps> = ({ rate, sourceCurrency }) => {
  if (sourceCurrency === 'AUD') {
    rate = 1 / rate;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-[#B8D1E5]">
      <div className="flex items-center gap-2 text-sm text-[#2B5D8C]">
        <RefreshCcw className="w-4 h-4" />
        <span>Exchange Rate: 1 {sourceCurrency} = {rate.toFixed(4)} {sourceCurrency === 'USD' ? 'AUD' : 'USD'}</span>
      </div>
    </div>
  );
};