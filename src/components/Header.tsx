import React from 'react';
import { DollarSign } from 'lucide-react';

export const Header: React.FC = () => (
  <div className="flex items-center gap-2 mb-6">
    <DollarSign className="w-8 h-8 text-[#2B5D8C]" />
    <h1 className="text-3xl font-bold text-[#1E3D5C]">Salary Calculator</h1>
  </div>
);