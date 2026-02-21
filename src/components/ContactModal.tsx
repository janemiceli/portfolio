import React, { useState } from 'react';
import { Mail, Phone, Copy, Check, X } from 'lucide-react';

const ContactModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const email = "averma7304@gmail.com";
  const phone = "+1 9133886757";

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-lg transition-colors border border-slate-700"
      >
        Contact Me
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-4 z-50 w-80 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl shadow-emerald-900/20 p-5 animate-in fade-in slide-in-from-top-4 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X size={18} />
            </button>

            <h3 className="text-xl font-bold text-slate-100 mb-1">Get in Touch</h3>
            <p className="text-slate-400 text-sm mb-4">Feel free to reach out!</p>

            <div className="space-y-3">
              {/* Email Field */}
              <div className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-emerald-500/30 transition-colors group">
                <a href={`mailto:${email}`} className="flex items-center gap-3 text-slate-200 hover:text-emerald-400 transition-colors flex-grow overflow-hidden">
                  <div className="p-1.5 bg-slate-800 rounded-md group-hover:bg-emerald-900/30 transition-colors flex-shrink-0">
                    <Mail size={16} className="text-emerald-400" />
                  </div>
                  <span className="font-mono text-xs truncate">{email}</span>
                </a>
                <button 
                  onClick={() => handleCopy(email, 'email')}
                  className="p-1.5 text-slate-400 hover:text-emerald-400 transition-colors flex-shrink-0"
                  title="Copy Email"
                >
                  {copiedField === 'email' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone Field */}
              <div className="flex items-center justify-between p-3 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-emerald-500/30 transition-colors group">
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-slate-200 hover:text-emerald-400 transition-colors flex-grow overflow-hidden">
                  <div className="p-1.5 bg-slate-800 rounded-md group-hover:bg-emerald-900/30 transition-colors flex-shrink-0">
                    <Phone size={16} className="text-emerald-400" />
                  </div>
                  <span className="font-mono text-xs truncate">{phone}</span>
                </a>
                <button 
                  onClick={() => handleCopy(phone, 'phone')}
                  className="p-1.5 text-slate-400 hover:text-emerald-400 transition-colors flex-shrink-0"
                  title="Copy Phone"
                >
                  {copiedField === 'phone' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

        </div>
      )}
    </div>
  );
};

export default ContactModal;