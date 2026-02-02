
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { MarketAdvisorService } from '../services/geminiService';
import { SUGGESTED_PROMPTS } from '../constants';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Welcome. I'm your Market Insight Advisor. How can I help you navigate the markets today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const advisor = useRef(new MarketAdvisorService());

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const result = await advisor.current.getAdvice(text);
    
    const assistantMessage: Message = {
      role: 'assistant',
      content: result.text,
      timestamp: new Date(),
      sources: result.sources
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] max-w-4xl mx-auto bg-slate-900/50 rounded-xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-sm">
      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none shadow-lg' 
                : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700'
            }`}>
              <div className="text-sm font-semibold mb-1 opacity-75 uppercase tracking-wider">
                {msg.role === 'user' ? 'Client' : 'Market Advisor'}
              </div>
              <div className="whitespace-pre-wrap leading-relaxed prose prose-invert max-w-none prose-sm md:prose-base">
                {msg.content}
              </div>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-700/50">
                  <div className="text-xs font-bold text-slate-400 mb-2">MARKET SOURCES:</div>
                  <div className="flex flex-wrap gap-2">
                    {msg.sources.map((source, si) => (
                      <a 
                        key={si} 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-[10px] bg-slate-900 hover:bg-slate-950 text-blue-400 px-2 py-1 rounded border border-slate-700 transition-colors"
                      >
                        {source.title.length > 25 ? source.title.substring(0, 25) + '...' : source.title}
                      </a>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="text-[10px] mt-2 text-right opacity-50">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700 animate-pulse">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompts */}
      <div className="px-4 py-2 flex flex-wrap gap-2 border-t border-slate-800 bg-slate-900/80">
        {SUGGESTED_PROMPTS.map((prompt, i) => (
          <button 
            key={i}
            onClick={() => handleSend(prompt)}
            disabled={isLoading}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700 transition-all hover:scale-105"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900 border-t border-slate-800">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a stock, sector or market trend..."
            className="w-full bg-slate-800 text-slate-100 pl-4 pr-16 py-4 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
