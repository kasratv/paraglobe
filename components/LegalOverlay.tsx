import React, { useEffect, useState } from 'react';

type LegalType = 'privacy' | 'terms' | 'cookies';

interface LegalOverlayProps {
    type: LegalType | null;
    onClose: () => void;
}

const LegalOverlay: React.FC<LegalOverlayProps> = ({ type, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (type) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        } else {
            setIsVisible(false);
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [type]);

    if (!type) return null;

    const content = {
        privacy: {
            title: 'Privacy Policy',
            lastUpdated: 'January 14, 2026',
            sections: [
                {
                    heading: '1. Introduction',
                    text: 'At Paraglobe Media Inc., we are committed to protecting your privacy while delivering advanced AI solutions. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our web applications and AI services.'
                },
                {
                    heading: '2. Data Collection',
                    text: 'We collect information you provide directly (such as account details and inquiries) and data automatically generated through your interaction with our services (including usage patterns, device information, and AI interaction logs for model optimization).'
                },
                {
                    heading: '3. AI & Data Usage',
                    text: 'Our AI systems analyze user inputs to provide relevant outputs. We may use anonymized interaction data to refine our models. We prioritize data minimization and do not use personal identifiers for training without explicit consent.'
                },
                {
                    heading: '4. Third-Party Sharing',
                    text: 'We partner with trusted third-party providers (e.g., Supabase, cloud infrastructure) to deliver our services. We ensure these partners adhere to strict data protection standards. We do not sell your personal data.'
                },
                {
                    heading: '5. Security',
                    text: 'We employ enterprise-grade encryption and security protocols to protect your data. However, no digital transmission is completely secure, and we encourage responsible account management.'
                }
            ]
        },
        terms: {
            title: 'Terms of Service',
            lastUpdated: 'January 14, 2026',
            sections: [
                {
                    heading: '1. Acceptance of Terms',
                    text: 'By accessing Paraglobe, you agree to be bound by these Terms. If you do not agree, you must cease use of our services immediately.'
                },
                {
                    heading: '2. Use of AI Services',
                    text: 'You agree to use our AI tools responsibly. You may not use our services to generate harmful, illegal, or deceptive content. Paraglobe retains the right to suspend accounts found safeguarding these principles.'
                },
                {
                    heading: '3. Intellectual Property',
                    text: 'The Paraglobe interface, design system (Bauhaus-inspired elements), and underlying code are the exclusive property of Paraglobe Media Inc. You obtain no rights to our IP through use of the service.'
                },
                {
                    heading: '4. Liability Limitation',
                    text: 'Our services are provided "as is". Paraglobe is not liable for any direct, indirect, or consequential damages arising from your use of our AI predictions or system outputs.'
                }
            ]
        },
        cookies: {
            title: 'Cookie Policy',
            lastUpdated: 'January 14, 2026',
            sections: [
                {
                    heading: '1. What Are Cookies',
                    text: 'Cookies are small text files stored on your device that help us remember your preferences and analyze site traffic.'
                },
                {
                    heading: '2. How We Use Them',
                    text: 'We use essential cookies for site functionality (e.g., authentication) and analytical cookies to understand how users interact with our AI visualizations. We do not use intrusive tracking cookies.'
                },
                {
                    heading: '3. Managing Preferences',
                    text: 'You can control cookie settings through your browser. However, disabling essential cookies may impact the functionality of our application.'
                }
            ]
        }
    };

    const activeContent = content[type];

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${isVisible ? 'opacity-100 backdrop-blur-md bg-black/80' : 'opacity-0 pointer-events-none'
                }`}
            onClick={onClose}
        >
            <div
                className="w-full max-w-3xl bg-[#0a0a0a] border border-white/10 max-h-[85vh] overflow-y-auto custom-scrollbar relative"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10 p-8 flex justify-between items-center z-10">
                    <div>
                        <h2 className="font-['Baumans'] text-3xl md:text-4xl text-white mb-2">{activeContent.title}</h2>
                        <p className="text-white/40 text-xs uppercase tracking-widest">Last Updated: {activeContent.lastUpdated}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-all rounded-full group"
                    >
                        <span className="text-xl leading-none group-hover:rotate-90 transition-transform">×</span>
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8">
                    {activeContent.sections.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                            <h3 className="text-blue-500 font-bold uppercase tracking-widest text-xs">{section.heading}</h3>
                            <p className="text-white/70 leading-relaxed text-sm md:text-base font-light">
                                {section.text}
                            </p>
                        </div>
                    ))}

                    <div className="pt-8 border-t border-white/5 mt-12 flex gap-4 opacity-50">
                        <div className="w-3 h-3 rounded-full bg-[#F4C300]" />
                        <div className="w-3 h-3 bg-[#E23D28]" />
                        <div className="w-3 h-3 bauhaus-blue" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalOverlay;
