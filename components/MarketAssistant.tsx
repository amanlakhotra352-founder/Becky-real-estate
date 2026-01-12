
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot } from 'lucide-react';
import { getPropertyAssistantResponse } from '../services/gemini';

const MarketAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Welcome to Becky's Private Desk. I'm her AI representative. Looking for something specific in Auburn?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const response = await getPropertyAssistantResponse(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: response || "I'm connecting you with the local data now." }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[160] pointer-events-auto">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-noir text-white p-5 md:p-6 rounded-full shadow-2xl hover:bg-gold hover:text-noir transition-all duration-500 flex items-center justify-center group border border-white/10 active:scale-90"
          aria-label="Open Market Assistant"
        >
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" />
          <span className="hidden md:block absolute left-full ml-4 bg-noir/90 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.3em] px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
            Becky's Concierge
          </span>
        </button>
      ) : (
        <div className="bg-ivory/95 backdrop-blur-2xl w-[88vw] sm:w-[380px] h-[70vh] md:h-[75vh] max-h-[600px] rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_100px_rgba(0,0,0,0.4)] border border-noir/5 overflow-hidden flex flex-col animate-reveal">
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-noir/5 flex justify-between items-center bg-ivory/50">
             <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-noir rounded-full flex items-center justify-center">
                   <Bot size={18} className="text-gold" />
                </div>
                <div>
                   <h4 className="text-[11px] md:text-sm font-bold uppercase tracking-widest text-noir">Private Concierge</h4>
                   <p className="text-[8px] md:text-[10px] text-noir/40 uppercase tracking-widest">Auburn Luxury Desk</p>
                </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="bg-noir/5 p-2 rounded-full hover:bg-gold hover:text-noir transition-colors active:scale-95">
                <X size={14} />
             </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-5 md:space-y-6 hide-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] p-4 md:p-5 rounded-2xl md:rounded-3xl text-[13px] md:text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-noir text-white rounded-tr-none' 
                    : 'bg-white text-noir rounded-tl-none font-serif italic border border-noir/5'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-noir/5 p-3 rounded-full px-5">
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-gold rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-gold rounded-full animate-bounce delay-100"></div>
                    <div className="w-1 h-1 bg-gold rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-5 md:p-6 bg-ivory border-t border-noir/5">
            <div className="relative flex items-center">
              <input 
                type="text"
                autoComplete="off"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message Concierge..."
                className="w-full bg-noir/5 border-none rounded-xl md:rounded-2xl px-5 py-4 text-[13px] md:text-sm focus:ring-1 focus:ring-gold outline-none pr-16 text-noir"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 bg-noir text-white p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-gold hover:text-noir transition-all active:scale-95 disabled:opacity-50"
                aria-label="Send Message"
                disabled={!input.trim()}
              >
                <Send size={12} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketAssistant;
