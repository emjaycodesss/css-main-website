import React, { useState } from 'react';
import { Button } from '../../../shared/components/ui/button';
import { HyperText } from '../../../shared/components/ui/hyper-text';
import { Mail, MapPin, Send, User, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-[#1a1d2e] pt-24 md:pt-48 pb-16 md:pb-24">
      <style>{`
        #contact .card-standard {
          background: #1a1d2e !important;
          border: 1px solid rgba(139,126,230,0.12) !important;
        }
        #contact .card-standard::before {
          display: none !important;
        }
      `}</style>
      <div className="w-full max-w-[1440px] 2xl:max-w-[1680px] mx-auto px-4 md:px-8 2xl:px-12 relative z-10">
        <div className="inline-flex items-center mb-2 md:mb-4 w-full justify-center">
          <div className="relative px-2 py-1 md:px-3 md:py-1.5">
            <span className="absolute top-0 left-0 w-1.5 h-1.5 md:w-3 md:h-2 border-t border-l border-[#8b7ee6]" />
            <span className="absolute top-0 right-0 w-1.5 h-1.5 md:w-3 md:h-2 border-t border-r border-[#8b7ee6]" />
            <span className="absolute bottom-0 left-0 w-1.5 h-1.5 md:w-3 md:h-2 border-b border-l border-[#8b7ee6]" />
            <span className="absolute bottom-0 right-0 w-1.5 h-1.5 md:w-3 md:h-2 border-b border-r border-[#8b7ee6]" />
            <h2 className="text-base sm:text-lg md:text-xl font-medium tracking-[0.02em] text-white cursor-default" style={{ fontFamily: 'var(--font-sans)' }}>
              <HyperText as="span" startOnView>CONTACT</HyperText>
            </h2>
          </div>
        </div>

        <h3 className="font-['Nasalization',sans-serif] font-normal uppercase leading-[0.95] tracking-[-0.02em] text-[clamp(2rem,5vw,4rem)] text-white mb-2 md:mb-4 pb-4 md:pb-6 cursor-default text-center">
          Get In Touch
        </h3>

        <p className="font-[var(--font-sans)] text-lg md:text-xl leading-relaxed text-[#b8b4c9] max-w-2xl mb-10 md:mb-12 cursor-default text-center mx-auto">
          Have questions or want to connect with the Computing Students' Society? We'd love to hear from you.
        </p>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div className="card-standard p-6 sm:p-8">
              <div className="relative z-10" style={{ isolation: 'isolate' }}>
                <h3 className="text-lg md:text-xl font-medium text-white mb-6 cursor-default" style={{ fontFamily: 'var(--font-sans)' }}>Contact Information</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[10px] bg-[rgba(139,126,230,0.15)] flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-[#8b7ee6]" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-subhead text-white cursor-default">Email</p>
                    <a href="mailto:ccis-css@mcm.edu.ph" className="text-subhead text-[#b8b4c9] hover:text-[#8b7ee6] transition-colors cursor-pointer">
                    ccis-css@mcm.edu.ph
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-[10px] bg-[rgba(139,126,230,0.15)] flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-[#8b7ee6]" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-subhead text-white cursor-default">Location</p>
                    <p className="text-subhead text-[#b8b4c9] cursor-default">
                      Gen. Douglas MacArthur Hwy, Talomo, Davao City, 8000 Davao del Sur
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(139,126,230,0.3)] to-transparent mt-8 mb-6" />

              <div className="pt-0">
                <h4 className="text-base font-medium text-white mb-3 cursor-default" style={{ fontFamily: 'var(--font-sans)' }}>Office Hours</h4>
                <div className="space-y-2 text-subhead text-[#b8b4c9] cursor-default">
                  <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
                  <p>Saturday - Sunday: Closed</p>
                </div>
              </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="card-standard p-6 sm:p-8">
              <div className="relative z-10" style={{ isolation: 'isolate' }}>
                <h3 className="text-lg md:text-xl font-medium text-white mb-6 cursor-default" style={{ fontFamily: 'var(--font-sans)' }}>Send us a Message</h3>

              {isSubmitted && (
                <div className="mb-6 p-4 bg-[rgba(74,222,128,0.1)] border border-[rgba(74,222,128,0.2)] rounded-[12px] flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#4ade80] flex-shrink-0" strokeWidth={2} />
                  <p className="text-subhead text-[#4ade80]">Your message has been sent successfully! We'll get back to you soon.</p>
                </div>
              )}

              {errors.general && (
                <div className="mb-6 p-4 bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.2)] rounded-[12px] flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-[#f87171] flex-shrink-0" strokeWidth={2} />
                  <p className="text-subhead text-[#f87171]">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-subhead text-white mb-2 cursor-default">Name</label>
                    <div className="relative cursor-text">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-[#b5a8d4]" strokeWidth={2} />
                      </div>
                      <input 
                        id="contact-name" 
                        type="text" 
                        value={formData.name} 
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full h-10 pl-12 pr-4 bg-[rgba(37,40,55,0.95)] border rounded-[12px] text-white text-subhead placeholder-[rgba(184,180,201,0.5)] cursor-text transition-colors duration-150 focus:outline-none focus:border-[#8b7ee6] ${errors.name ? 'border-[#f87171]' : 'border-[rgba(58,53,80,0.8)]'}`}
                        placeholder="Your name" 
                      />
                    </div>
                    {errors.name && <p className="mt-2 text-caption-1 text-[#f87171] cursor-default">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-subhead text-white mb-2 cursor-default">Email</label>
                    <div className="relative cursor-text">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-[#b5a8d4]" strokeWidth={2} />
                      </div>
                      <input 
                        id="contact-email" 
                        type="email" 
                        value={formData.email} 
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full h-10 pl-12 pr-4 bg-[rgba(37,40,55,0.95)] border rounded-[12px] text-white text-subhead placeholder-[rgba(184,180,201,0.5)] cursor-text transition-colors duration-150 focus:outline-none focus:border-[#8b7ee6] ${errors.email ? 'border-[#f87171]' : 'border-[rgba(58,53,80,0.8)]'}`}
                        placeholder="your@email.com" 
                      />
                    </div>
                    {errors.email && <p className="mt-2 text-caption-1 text-[#f87171] cursor-default">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-subhead text-white mb-2 cursor-default">Subject</label>
                  <div className="relative cursor-text">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-[#b5a8d4]" strokeWidth={2} />
                    </div>
                    <input 
                      id="contact-subject" 
                      type="text" 
                      value={formData.subject} 
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className={`w-full h-10 pl-12 pr-4 bg-[rgba(37,40,55,0.95)] border rounded-[12px] text-white text-subhead placeholder-[rgba(184,180,201,0.5)] cursor-text transition-colors duration-150 focus:outline-none focus:border-[#8b7ee6] ${errors.subject ? 'border-[#f87171]' : 'border-[rgba(58,53,80,0.8)]'}`}
                      placeholder="What is this about?" 
                    />
                  </div>
                  {errors.subject && <p className="mt-2 text-caption-1 text-[#f87171] cursor-default">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-subhead text-white mb-2 cursor-default">Message</label>
                  <textarea 
                    id="contact-message" 
                    rows={5}
                    value={formData.message} 
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className={`w-full px-4 py-3 bg-[rgba(37,40,55,0.95)] border rounded-[12px] text-white text-subhead placeholder-[rgba(184,180,201,0.5)] cursor-text transition-colors duration-150 focus:outline-none focus:border-[#8b7ee6] resize-none ${errors.message ? 'border-[#f87171]' : 'border-[rgba(58,53,80,0.8)]'}`}
                    placeholder="Tell us what's on your mind..." 
                  />
                  {errors.message && <p className="mt-2 text-caption-1 text-[#f87171] cursor-default">{errors.message}</p>}
                </div>

                <Button type="submit" disabled={isLoading} variant="primary" className="w-full sm:w-auto">
                  {isLoading ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" strokeWidth={2} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
