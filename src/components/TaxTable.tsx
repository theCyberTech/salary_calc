import React from 'react';
import { TaxBreakdown } from '../types/calculator';

interface TaxTableProps {
  taxInfo: TaxBreakdown;
}

export const TaxTable: React.FC<TaxTableProps> = ({ taxInfo }) => (
  <div className="mt-8">
    <h2 className="text-xl font-semibold text-[#1E3D5C] mb-4">Australian Tax & Super Breakdown (Yearly)</h2>
    <div className="overflow-x-auto rounded-lg border border-[#B8D1E5]">
      <table className="w-full">
        <tbody className="bg-white divide-y divide-[#B8D1E5]">
          <tr className="hover:bg-[#F8FAFC]">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1E3D5C]">Base Salary</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2B5D8C]">
              ${taxInfo.taxableIncome.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </td>
          </tr>
          <tr className="hover:bg-[#F8FAFC]">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1E3D5C]">Superannuation (11.5%)</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2B5D8C]">
              ${taxInfo.superannuation.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </td>
          </tr>
          <tr className="hover:bg-[#F8FAFC] bg-[#F1F6FA]">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1E3D5C]">Total Package</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#1E3D5C]">
              ${taxInfo.totalPackage.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </td>
          </tr>
          <tr><td colSpan={2} className="px-6 py-2 text-xs text-[#2B5D8C]">Tax Breakdown</td></tr>
          <tr className="hover:bg-[#F8FAFC]">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1E3D5C]">Tax Payable</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2B5D8C]">
              ${taxInfo.taxPayable.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </td>
          </tr>
          <tr className="hover:bg-[#F8FAFC]">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1E3D5C]">Effective Tax Rate</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2B5D8C]">
              {taxInfo.effectiveRate.toFixed(1)}%
            </td>
          </tr>
          <tr className="hover:bg-[#F8FAFC]">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1E3D5C]">Marginal Tax Rate</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2B5D8C]">
              {taxInfo.marginalRate}%
            </td>
          </tr>
          <tr className="hover:bg-[#F8FAFC] bg-[#F1F6FA]">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#1E3D5C]">Take Home Pay</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#1E3D5C]">
              ${taxInfo.takeHome.toLocaleString('en-US', { maximumFractionDigits: 2 })}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);