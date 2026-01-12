
import React, { useState } from 'react';
import { Send, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';

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
    await new Promise(resolve => setTimeout(resolve, 2000));
    setStatus('success');
    setFormData({ name: '', email: '', phone: '', interest: 'Buying', message: '' });
  };

  if (status === 'success') {
    return (
      <div className="bg-noir border border-gold/40 rounded-sm p-8 md:p-16 text-center space-y-8 animate-reveal">
        <div className="w-24 h-24 bg-gold rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(197,160,89,0.3)]">
          <CheckCircle2 size={40} className="text-noir" />
        </div>
        <div className="space-y-4">
          <h3 className="text-4xl font-serif text-white italic">Inquiry Secured</h3>
          <p className="text-white/70 font-medium leading-relaxed max-w-sm mx-auto italic font-serif text-lg">
            Becky Maldeney has been notified. You will receive a bespoke correspondence within the next business cycle.
          </p>
        </div>
        <button 
          onClick={() => setStatus('idle')}
          className="text-gold text-[10px] uppercase tracking-[0.5em] font-black hover:text-white transition-all"
        >
          New Consultation Request
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Decorative Blur Background */}
      <div className="absolute -inset-4 bg-gold/5 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
      
      <form 
        onSubmit={handleSubmit} 
        className="relative bg-noir border border-white/10 rounded-sm p-8 md:p-12 lg:p-14 shadow-3xl space-y-10 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-serif text-white tracking-tighter font-bold">Private Entry<span className="text-gold">.</span></h3>
            <p className="text-white/50 text-[10px] uppercase tracking-[0.4em] font-black">Executive Portfolio Access</p>
          </div>
          <div className="flex items-center space-x-2 text-gold/60">
            <ShieldCheck size={16} />
            <span className="text-[8px] uppercase tracking-[0.2em] font-bold">Secure SSL Uplink</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.3em] text-gold/80 font-black">Client Name</label>
            <input 
              required
              type="text"
              placeholder="Full Name"
              className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 text-white focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-white/20 text-sm"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.3em] text-gold/80 font-black">Email Address</label>
            <input 
              required
              type="email"
              placeholder="Email"
              className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 text-white focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-white/20 text-sm"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.3em] text-gold/80 font-black">Contact Line</label>
            <input 
              required
              type="tel"
              placeholder="+1 (260) 000-0000"
              className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 text-white focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-white/20 text-sm"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.3em] text-gold/80 font-black">Objective</label>
            <div className="relative">
              <select 
                className="w-full bg-noir border border-white/10 rounded-none px-6 py-4 text-white focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all appearance-none cursor-pointer text-sm"
                value={formData.interest}
                onChange={e => setFormData({...formData, interest: e.target.value})}
              >
                <option value="Buying">Acquisition (Buying)</option>
                <option value="Selling">Divestment (Selling)</option>
                <option value="Investment">Asset Strategy</option>
                <option value="Tour">Private Tour</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                <Loader2 size={12} className="opacity-40" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[10px] uppercase tracking-[0.3em] text-gold/80 font-black">Specific Requirements</label>
          <textarea 
            rows={3}
            placeholder="Property preferences, acreage, or architectural styles..."
            className="w-full bg-white/5 border border-white/10 rounded-none px-6 py-4 text-white focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-white/20 resize-none text-sm"
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>

        <button 
          disabled={status === 'submitting'}
          className="w-full bg-gold text-noir py-6 rounded-none font-black uppercase tracking-[0.4em] text-xs hover:bg-white transition-all shadow-2xl flex items-center justify-center space-x-4 group disabled:opacity-50"
        >
          {status === 'submitting' ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <span>Submit Formal Inquiry</span>
              <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </>
          )}
        </button>
        
        <p className="text-[8px] text-center text-white/30 uppercase tracking-[0.2em] font-medium italic">
          Data encryption active. Your correspondence is privileged and protected.
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
