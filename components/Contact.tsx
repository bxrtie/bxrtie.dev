
import React, { useState } from 'react';
import { Mail, Send, ArrowUpRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

// Updated with your specific Formspree Form ID
const FORMSPREE_FORM_ID = "movrbpbq"; 

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
           console.error(data["errors"].map((error: any) => error["message"]).join(", "))
        }
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const inputClasses = "block w-full px-4 py-3 bg-white dark:bg-slate-900 border rounded-lg transition-all duration-200 font-mono text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none";

  const getBorderClass = (fieldName: string) => {
    if (focusedField === fieldName) return "border-brand-500 ring-1 ring-brand-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]";
    return "border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600";
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl mb-6">
              Let's Establish an Uplink
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
              Ready to collaborate on high-impact systems? Initiate a transmission below. Secure channel open.
            </p>
            
            <div className="mb-8 space-y-4">
              <a 
                href="mailto:mail@bxrtie.dev" 
                className="inline-flex items-center text-xl font-semibold text-brand-600 dark:text-brand-400 hover:underline font-mono"
              >
                <Mail className="mr-3 h-6 w-6" />
                mail@bxrtie.dev
              </a>
            </div>

            <div className="p-6 bg-brand-50 dark:bg-brand-900/10 rounded-xl border border-brand-100 dark:border-brand-900/20">
              <p className="text-brand-800 dark:text-brand-200 font-medium font-mono text-sm">
                [STATUS_CHECK]:
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 animate-pulse">
                  ONLINE_&_LISTENING
                </span>
              </p>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg relative overflow-hidden">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-brand-500 rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-brand-500 rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-brand-500 rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-brand-500 rounded-br-lg" />

            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Transmission Received</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Your message has been successfully encoded and sent to the server. I will respond shortly.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 px-6 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors font-mono text-sm"
                >
                  SEND_NEW_MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="relative group">
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-mono uppercase tracking-wider text-xs">
                    IDENTIFIER
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputClasses} ${getBorderClass('name')}`}
                    disabled={status === 'submitting'}
                  />
                </div>
                
                <div className="relative group">
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-mono uppercase tracking-wider text-xs">
                    RETURN_ADDRESS
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email@domain.com"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputClasses} ${getBorderClass('email')}`}
                    disabled={status === 'submitting'}
                  />
                </div>
                
                <div className="relative group">
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-mono uppercase tracking-wider text-xs">
                    PAYLOAD_DATA
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Transmit your message parameters..."
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputClasses} ${getBorderClass('message')}`}
                    disabled={status === 'submitting'}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800">
                    <AlertCircle className="flex-shrink-0 inline w-4 h-4 mr-3" />
                    <span>Transmission failed. Please check your connection or try again.</span>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex items-center justify-center px-8 py-4 border border-transparent rounded-lg text-base font-medium text-white transition-all duration-200 font-mono tracking-widest bg-brand-600 hover:bg-brand-700 shadow-lg hover:shadow-brand-500/30 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <span className="relative z-10 flex items-center">
                      TRANSMITTING... <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    </span>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center">
                        INITIATE_SEND <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
