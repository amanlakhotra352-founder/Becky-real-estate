
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
    <div className="fixed bottom-8 left-8 z-[160] pointer-events-auto">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-noir text-white p-6 rounded-full shadow-2xl hover:bg-gold hover:text-noir transition-all duration-500 flex items-center justify-center group border border-white/10"
          aria-label="Open Market Assistant"
        >
          <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="absolute left-full ml-4 bg-noir/90 backdrop-blur-md text-white text-[10px] uppercase tracking-[0.3em] px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
            Becky's Concierge
          </span>
        </button>
      ) : (
        <div className="bg-white/95 backdrop-blur-2xl w-[90vw] md:w-[400px] h-[600px] rounded-[2.5rem] shadow-[0_20px_100px_rgba(0,0,0,0.3)] border border-noir/5 overflow-hidden flex flex-col animate-reveal">
          {/* Header */}
          <div className="p-8 border-b border-noir/5 flex justify-between items-center bg-ivory/50">
             <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-noir rounded-full flex items-center justify-center">
                   <Bot size={20} className="text-gold" />
                </div>
                <div>
                   <h4 className="text-sm font-bold uppercase tracking-widest text-noir">Private Concierge</h4>
                   <p className="text-[10px] text-noir/40 uppercase tracking-widest">Auburn Luxury Desk</p>
                </div>
             </div>
             <button onClick={() => setIsOpen(false)} className="bg-noir/5 p-2 rounded-full hover:bg-gold hover:text-noir transition-colors">
                <X size={16} />
             </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-8 space-y-6 hide-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-3xl text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-noir text-white rounded-tr-none' 
                    : 'bg-ivory text-noir rounded-tl-none font-serif italic border border-noir/5'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-noir/5 p-4 rounded-full px-6">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-gold rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 bg-white border-t border-noir/5">
            <div className="relative flex items-center">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Message Concierge..."
                className="w-full bg-noir/5 border-none rounded-2xl px-6 py-5 text-sm focus:ring-1 focus:ring-gold outline-none pr-20 text-noir"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 bg-noir text-white p-4 rounded-xl hover:bg-gold hover:text-noir transition-all"
                aria-label="Send Message"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketAssistant;
