import React, { useState } from 'react';

interface EmailCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
    industry: string;
    scale: string;
    isProcessing?: boolean;
}

const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    industry,
    scale,
    isProcessing = false,
}) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            setError('Email is required');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setError('');
        onSubmit(email);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={!isProcessing ? onClose : undefined}
            />

            {/* Modal */}
            <div className="relative bg-black border-2 border-white max-w-md w-full p-8 shadow-2xl">
                {/* Close button */}
                {!isProcessing && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}

                {/* Header */}
                <div className="mb-6">
                    <div className="inline-block px-3 py-1 bg-blue-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                        Save Architecture
                    </div>
                    <h2 className="text-2xl font-display font-bold uppercase tracking-tight mb-2">
                        Get Your Diagram
                    </h2>
                    <p className="text-white/50 text-sm">
                        Enter your email to receive the {industry} {scale} architecture diagram as a PDF.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                            placeholder="your@email.com"
                            disabled={isProcessing}
                            className="w-full bg-white/5 border border-white/10 p-4 focus:outline-none focus:border-blue-600 transition-colors placeholder:text-white/10 disabled:opacity-50"
                        />
                        {error && (
                            <p className="mt-2 text-xs text-red-500 uppercase tracking-wider">{error}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isProcessing}
                        className={`w-full py-4 font-bold uppercase tracking-[0.2em] text-xs transition-all ${isProcessing
                                ? 'bg-white/10 text-white/40 cursor-not-allowed'
                                : 'bg-white text-black hover:bg-blue-600 hover:text-white'
                            }`}
                    >
                        {isProcessing ? 'Processing...' : 'Save & Send PDF'}
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-[9px] text-white/30 text-center uppercase tracking-wider">
                    We'll send the PDF to your email and save it for future reference
                </p>
            </div>
        </div>
    );
};

export default EmailCaptureModal;
