
import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'Buying',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setStatus('success');
    setFormData({ name: '', email: '', phone: '', interest: 'Buying', message: '' });
  };

  if (status === 'success') {
    return (
      <div className="bg-white/5 border border-gold/30 rounded-[2rem] p-8 md:p-12 text-center space-y-6 animate-reveal">
        <div className="w-20 h-20 bg-gold rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(197,160,89,0.4)]">
          <CheckCircle2 size={40} className="text-noir" />
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-serif text-white">Inquiry Received</h3>
          <p className="text-white/60 font-medium leading-relaxed max-w-sm mx-auto italic font-serif">
            Becky has been notified of your interest. Expect a private correspondence within the next 2 hours.
          </p>
        </div>
        <button 
          onClick={() => setStatus('idle')}
          className="text-gold text-[10px] uppercase tracking-[0.4em] font-black hover:text-white transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-2xl backdrop-blur-md">
      <div className="space-y-2">
        <h3 className="text-3xl md:text-4xl font-serif text-white tracking-tighter">Private Inquiry</h3>
        <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.3em] font-black">Auburn Executive Desk</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-black ml-1">Full Name</label>
          <input 
            required
            type="text"
            placeholder="Johnathan Sterling"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-white/10"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-black ml-1">Email Address</label>
          <input 
            required
            type="email"
            placeholder="sterling@estate.com"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-white/10"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-black ml-1">Phone Number</label>
          <input 
            required
            type="tel"
            placeholder="+1 (260) 000-0000"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-white/10"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-black ml-1">Nature of Interest</label>
          <select 
            className="w-full bg-noir border border-white/10 rounded-xl px-6 py-4 text-white focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all appearance-none cursor-pointer"
            value={formData.interest}
            onChange={e => setFormData({...formData, interest: e.target.value})}
          >
            <option value="Buying">Acquisition (Buying)</option>
            <option value="Selling">Listing (Selling)</option>
            <option value="Investment">Investment Strategy</option>
            <option value="Tour">Private Tour Request</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-[0.4em] text-gold font-black ml-1">Message</label>
        <textarea 
          rows={4}
          placeholder="Specify property preferences or listing details..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-white/10 resize-none"
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
        ></textarea>
      </div>

      <button 
        disabled={status === 'submitting'}
        className="w-full bg-gold text-noir py-6 rounded-2xl font-black uppercase tracking-[0.4em] text-xs hover:bg-white transition-all shadow-[0_20px_50px_rgba(197,160,89,0.3)] flex items-center justify-center space-x-4 group disabled:opacity-50"
      >
        {status === 'submitting' ? (
          <Loader2 className="animate-spin" size={20} />
        ) : (
          <>
            <span>Submit Formal Inquiry</span>
            <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
          </>
        )}
      </button>
      
      <p className="text-[9px] text-center text-white/20 uppercase tracking-[0.3em] font-medium italic">
        Your data is strictly confidential and protected by IRMLS privacy protocols.
      </p>
    </form>
  );
};

export default ContactForm;
