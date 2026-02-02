
import React from 'react';

export const SUGGESTED_PROMPTS = [
  "How is the market today?",
  "Which stocks to buy in the IT sector?",
  "Should I buy or sell Tesla right now?",
  "What's the outlook for the banking sector?",
  "Is it a good time to hold gold stocks?"
];

export const INITIAL_MARKET_DATA = [
  { name: 'S&P 500', value: '5,026.11', change: '+0.15%', isPositive: true },
  { name: 'NASDAQ', value: '15,990.66', change: '-0.32%', isPositive: false },
  { name: 'DOW JONES', value: '38,677.32', change: '+0.14%', isPositive: true },
  { name: 'NIFTY 50', value: '22,040.70', change: '+1.20%', isPositive: true },
  { name: 'GOLD', value: '$2,024.40', change: '+0.05%', isPositive: true },
  { name: 'CRUDE OIL', value: '$76.84', change: '-2.11%', isPositive: false }
];
