
import React, { useState } from 'react';
import { supabase } from '../services/supabaseClient';

interface ContactPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tel: '',
        clientType: 'Small Corporation',
        budget: '$5000 - $10,000',
        deadline: '30-60 Days',
        comment: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        try {
            const { error } = await supabase
                .from('contacts')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        phone: formData.tel,
                        client_type: formData.clientType,
                        budget: formData.budget,
                        deadline: formData.deadline,
                        comment: formData.comment
                    }
                ]);

            if (error) throw error;

            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({
                    name: '',
                    email: '',
                    tel: '',
                    clientType: 'Small Corporation',
                    budget: '$5000 - $10,000',
                    deadline: '30-60 Days',
                    comment: ''
                });
            }, 2000);
        } catch (err) {
            console.error('Error submitting form:', err);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="relative w-full max-w-xl bg-black border border-white/20 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                {/* Bauhaus Accents */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 -mr-12 -mt-12 rounded-full blur-3xl opacity-50" />
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/40 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors"
                >
                    [ Close ]
                </button>

                <div className="relative z-10">
                    <div className="mb-10">
                        <h2 className="text-4xl font-display font-black uppercase tracking-tight mb-2">
                            Connect <br />
                            <span className="outline-text">With Us</span>
                        </h2>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-[1px] bg-blue-600" />
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">Technical Inquiry Framework</p>
                        </div>
                    </div>

                    {status === 'success' ? (
                        <div className="py-20 text-center animate-in zoom-in duration-500">
                            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="text-xl font-light text-white/80">Initialization Complete. We'll be in touch.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold block">Name</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none transition-colors"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold block">Email</label>
                                    <input
                                        required
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none transition-colors"
                                        placeholder="corp@address.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold block">Tel</label>
                                    <input
                                        required
                                        type="tel"
                                        value={formData.tel}
                                        onChange={(e) => setFormData({ ...formData, tel: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none transition-colors"
                                        placeholder="+1 (000) 000-0000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold block">Target Entity</label>
                                    <select
                                        value={formData.clientType}
                                        onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none transition-colors appearance-none"
                                    >
                                        <option className="bg-black" value="Small Corporation">Small Corporation</option>
                                        <option className="bg-black" value="Medium Corporation">Medium Corporation</option>
                                        <option className="bg-black" value="Enterprise">Enterprise</option>
                                        <option className="bg-black" value="Other">Specific Domain</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold block">Project Budget</label>
                                    <select
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none transition-colors appearance-none"
                                    >
                                        <option className="bg-black" value="$5000 - $10,000">$5,000 - $10,000</option>
                                        <option className="bg-black" value="$10,000 - $25,000">$10,000 - $25,000</option>
                                        <option className="bg-black" value="$25,000 - $100,000">$25,000 - $100,000</option>
                                        <option className="bg-black" value="$100,000+">$100,000+</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold block">Project Deadline</label>
                                    <select
                                        value={formData.deadline}
                                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none transition-colors appearance-none"
                                    >
                                        <option className="bg-black" value="30-60 Days">30-60 Days</option>
                                        <option className="bg-black" value="60-90 Days">60-90 Days</option>
                                        <option className="bg-black" value="90-120 Days">90-120 Days</option>
                                        <option className="bg-black" value="120+ Days">120+ Days</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] uppercase tracking-widest text-white/40 font-bold block">Project Parameters</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.comment}
                                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none transition-colors resize-none"
                                    placeholder="Brief description of your visionary requirements..."
                                />
                            </div>

                            {status === 'error' && (
                                <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest">
                                    Submission error // Please check network parameters
                                </p>
                            )}

                            <button
                                disabled={isSubmitting}
                                type="submit"
                                className="w-full py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50 group flex items-center justify-center gap-3"
                            >
                                {isSubmitting ? 'Processing...' : 'Deploy Submission'}
                                {!isSubmitting && (
                                    <div className="flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                        <div className="w-1.5 h-1.5 bg-red-600" />
                                    </div>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* Bauhaus Minimal shapes decoration */}
                <div className="absolute bottom-12 right-12 flex items-end gap-1 opacity-10">
                    <div className="w-4 h-4 rounded-full bg-[#F4C300]" />
                    <div className="w-4 h-4 bg-[#E23D28]" />
                </div>
            </div>
        </div>
    );
};

export default ContactPopup;
