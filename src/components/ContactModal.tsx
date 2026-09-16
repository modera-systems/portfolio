import React, { useState } from 'react';
import { X, Mail, Copy, Check, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roleType, setRoleType] = useState('Solutions Engineer');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('moniquev.tech@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 text-slate-900 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          id="modal-close-btn"
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-[11px] font-mono-tech text-slate-600 mb-2">
            <span>GET IN TOUCH</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-slate-900">
            Let’s Discuss Solutions & Architecture
          </h3>
          <p className="text-slate-500 text-xs mt-1">
            Interested in discussing an open role, technical implementation, or integration challenge?
          </p>
        </div>

        {/* Quick Email Copy Banner */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-xs">
            <Mail className="w-4 h-4 text-[#ea580c]" />
            <span className="font-mono-tech font-semibold text-slate-800">moniquev.tech@gmail.com</span>
          </div>
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {sent ? (
          <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-semibold text-emerald-900 text-sm">Message Received</h4>
            <p className="text-xs text-emerald-800">
              Thank you for reaching out. I look forward to reviewing your inquiry and connecting promptly.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Topic / Role Alignment</label>
              <select
                value={roleType}
                onChange={(e) => setRoleType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
              >
                <option value="Solutions Engineer">Solutions Engineer Role</option>
                <option value="Solutions Architect">Solutions Architect Role</option>
                <option value="Implementation Engineer">Implementation Engineer / Delivery</option>
                <option value="Technical Consultant">Technical Solutions Consulting</option>
                <option value="Other Technical Collaboration">Other Technical Collaboration</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Message / Project Context</label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share a brief overview of the role, systems, or technical challenge..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:border-[#ea580c] focus:ring-1 focus:ring-[#ea580c]"
              ></textarea>
            </div>

            <button
              type="submit"
              id="submit-contact-btn"
              className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Send className="w-3.5 h-3.5 text-[#ea580c]" />
              <span>Send Message</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
