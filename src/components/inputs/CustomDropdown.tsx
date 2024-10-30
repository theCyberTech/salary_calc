import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FrequencyType, CurrencyType } from '../../types/calculator';

interface CustomDropdownProps<T extends string> {
  label: string;
  value: T;
  options: T[];
  onChange: (value: T) => void;
  capitalize?: boolean;
}

export const CustomDropdown = <T extends string>({ 
  label,
  value,
  options,
  onChange,
  capitalize = false,
}: CustomDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-[#2B5D8C] mb-2">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        className="w-full px-4 py-3 bg-white border border-[#B8D1E5] rounded-lg focus:ring-2 focus:ring-[#2B5D8C] focus:border-[#2B5D8C] flex items-center justify-between shadow-sm"
      >
        <span className={`text-[#1E3D5C] ${capitalize ? 'capitalize' : ''}`}>{value}</span>
        <ChevronDown className={`w-4 h-4 text-[#2B5D8C] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-[#B8D1E5] rounded-lg shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-[#F1F6FA] transition-colors ${capitalize ? 'capitalize' : ''} ${
                value === option ? 'bg-[#F1F6FA] text-[#2B5D8C] font-medium' : 'text-[#1E3D5C]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};