
import React from 'react';
import ChatInterface from './components/ChatInterface';
import MarketTicker from './components/MarketTicker';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <MarketTicker />
      
      {/* Header */}
      <header className="px-6 py-8 flex items-center justify-between border-b border-slate-800/50 bg-slate-900/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">MarketInsight Advisor</h1>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">Real-time Professional Guidance</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-6 text-sm text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live Analysis Active</span>
          </div>
          <div className="border-l border-slate-700 h-6"></div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-300">Strategy:</span>
            <span className="bg-slate-800 px-2 py-0.5 rounded text-blue-400">Balanced Growth</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 flex flex-col justify-center">
        <ChatInterface />
        
        {/* Footer info */}
        <div className="max-w-4xl mx-auto w-full mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/50">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-1">Market Sentiment</h3>
            <p className="text-sm font-semibold text-emerald-400">Moderately Bullish</p>
          </div>
          <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/50">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-1">Top Sector</h3>
            <p className="text-sm font-semibold text-blue-400">Tech & Semiconductors</p>
          </div>
          <div className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/50">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase mb-1">Key Focus</h3>
            <p className="text-sm font-semibold text-amber-400">Fed Interest Rate Outlook</p>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-800/50 text-center text-slate-600 text-[11px] uppercase tracking-widest font-medium">
        MarketInsight Advisor &copy; {new Date().getFullYear()} • Professional Financial Intelligence
      </footer>
    </div>
  );
};

export default App;
