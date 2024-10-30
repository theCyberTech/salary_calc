import React from 'react';
import { Calculator, Wallet } from 'lucide-react';
import { TabType } from '../types/calculator';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'calculator', label: 'Salary Calculator', icon: Calculator },
    { id: 'outgoings', label: 'Outgoings', icon: Wallet },
  ] as const;

  return (
    <div className="flex space-x-2 mb-6">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
            ${activeTab === id
              ? 'bg-[#2B5D8C] text-white'
              : 'bg-[#F1F6FA] text-[#2B5D8C] hover:bg-[#E1EBF5]'
            }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
};