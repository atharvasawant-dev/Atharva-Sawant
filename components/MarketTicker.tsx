
import React from 'react';
import { INITIAL_MARKET_DATA } from '../constants';

const MarketTicker: React.FC = () => {
  return (
    <div className="bg-slate-900 border-b border-slate-800 py-2 overflow-hidden whitespace-nowrap sticky top-0 z-50">
      <div className="animate-ticker flex items-center space-x-12">
        {[...INITIAL_MARKET_DATA, ...INITIAL_MARKET_DATA].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-sm font-medium">
            <span className="text-slate-400">{item.name}</span>
            <span className="text-white">{item.value}</span>
            <span className={item.isPositive ? "text-emerald-400" : "text-rose-400"}>
              {item.isPositive ? '▲' : '▼'} {item.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;
