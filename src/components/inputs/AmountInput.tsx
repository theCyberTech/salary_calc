import React from 'react';
import { DollarSign } from 'lucide-react';

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#2B5D8C] mb-2">
        Amount
      </label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2B5D8C]" />
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full pl-10 pr-4 py-3 border border-[#B8D1E5] rounded-lg focus:ring-2 focus:ring-[#2B5D8C] focus:border-[#2B5D8C] bg-white shadow-sm"
        />
      </div>
    </div>
  );
};