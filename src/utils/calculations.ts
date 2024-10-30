import { Calculations, FrequencyType } from '../types/calculator';

const HOURS_PER_DAY = 8;
const DAYS_PER_WEEK = 5;
const WEEKS_PER_MONTH = 4.33;
const MONTHS_PER_YEAR = 12;
const WEEKS_PER_FORTNIGHT = 2;

export function calculateSalaries(amount: number, frequency: FrequencyType): Calculations {
  let hourly: number;

  switch (frequency) {
    case 'hourly':
      hourly = amount;
      break;
    case 'daily':
      hourly = amount / HOURS_PER_DAY;
      break;
    case 'weekly':
      hourly = amount / (HOURS_PER_DAY * DAYS_PER_WEEK);
      break;
    case 'fortnightly':
      hourly = amount / (HOURS_PER_DAY * DAYS_PER_WEEK * WEEKS_PER_FORTNIGHT);
      break;
    case 'monthly':
      hourly = amount / (HOURS_PER_DAY * DAYS_PER_WEEK * WEEKS_PER_MONTH);
      break;
    case 'yearly':
      hourly = amount / (HOURS_PER_DAY * DAYS_PER_WEEK * WEEKS_PER_MONTH * MONTHS_PER_YEAR);
      break;
    default:
      hourly = 0;
  }

  return {
    hourly: {
      label: 'Hourly',
      usd: hourly,
    },
    daily: {
      label: 'Daily',
      usd: hourly * HOURS_PER_DAY,
    },
    weekly: {
      label: 'Weekly',
      usd: hourly * HOURS_PER_DAY * DAYS_PER_WEEK,
    },
    fortnightly: {
      label: 'Fortnightly',
      usd: hourly * HOURS_PER_DAY * DAYS_PER_WEEK * WEEKS_PER_FORTNIGHT,
    },
    monthly: {
      label: 'Monthly',
      usd: hourly * HOURS_PER_DAY * DAYS_PER_WEEK * WEEKS_PER_MONTH,
    },
    yearly: {
      label: 'Yearly',
      usd: hourly * HOURS_PER_DAY * DAYS_PER_WEEK * WEEKS_PER_MONTH * MONTHS_PER_YEAR,
    },
  };
}