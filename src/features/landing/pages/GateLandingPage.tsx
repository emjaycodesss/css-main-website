import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../../../shared/components/ui/button';
import { Input } from '../../../shared/components/ui/input';
import { SearchableSelect } from '../../../shared/components/ui/searchable-select';
import { CheckCircle, KeyRound } from 'lucide-react';

/** Mock verification: accept this code to proceed (replace with API in production) */
const VALID_CODE = 'CSS24';

/** Program options for searchable select */
const PROGRAMS = [
  { value: 'cs', label: 'Computer Science' },
  { value: 'emc', label: 'Entertainment and Multimedia Computing' },
  { value: 'is', label: 'Information Systems' },
];


type Step = 'verify' | 'form' | 'success';

/**
 * Mobile-first gate landing: QR → verify code → form (Name, Section, Program) → success.
 * Uses design tokens, one-column layout, progress indicator, inline validation, WCAG AA.
 */
const GateLandingPage: React.FC = () => {
  const [step, setStep] = useState<Step>('verify');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const codeInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [program, setProgram] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Auto-focus verification input on mount (mobile keyboard ready) */
  useEffect(() => {
    if (step === 'verify') {
      const t = setTimeout(() => codeInputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [step]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError('');
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) {
      setCodeError('Please enter the verification code');
      return;
    }
    setIsVerifying(true);
    // Simulate network delay
    setTimeout(() => {
      if (trimmed === VALID_CODE) {
        setCodeSuccess(true);
        setCodeError('');
        setStep('form');
      } else {
        setCodeError('Invalid code. Please try again.');
        setCodeSuccess(false);
      }
      setIsVerifying(false);
    }, 400);
  };

  const validateForm = (): boolean => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!section) next.section = 'Please select your section';
    if (!program) next.program = 'Please select your program';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    // Simulate submit
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 800);
  };

  const progressLabel =
    step === 'verify' ? 'Step 1 of 2' : step === 'form' ? 'Step 2 of 2' : 'Complete';

  return (
    <div
      className="min-h-screen bg-[#1a1d2e] flex flex-col items-center justify-center px-4 pt-[var(--navbar-height,72px)] py-8 pb-[max(2rem,env(safe-area-inset-bottom))]"
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      {/* Progress indicator: visible on all steps */}
      <div className="w-full max-w-[min(400px,100%)] mb-6" role="status" aria-live="polite">
        <div className="flex items-center justify-center gap-2">
          <span
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: step === 'verify' ? '50%' : step === 'form' ? '50%' : '100%',
              backgroundColor: 'rgba(139, 126, 230, 0.5)',
            }}
          />
          <span
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: step === 'verify' ? '50%' : step === 'form' ? '50%' : '0%',
              backgroundColor: step !== 'verify' ? 'rgba(139, 126, 230, 0.9)' : 'rgba(139, 126, 230, 0.2)',
            }}
          />
        </div>
        <p className="text-center text-[var(--text-footnote)] text-[#b8b4c9] mt-2">{progressLabel}</p>
      </div>

      <div className="w-full max-w-[min(400px,100%)] flex flex-col items-center">
        {/* ----- Step 1: Access gate ----- */}
        {step === 'verify' && (
          <div className="card-standard w-full p-6 sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[rgba(139,126,230,0.2)] flex items-center justify-center mb-4">
                <KeyRound className="h-6 w-6 text-[#8b7ee6]" strokeWidth={2} aria-hidden />
              </div>
              <h1
                className="text-[var(--text-title-1)] text-white mb-2"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Enter verification code
              </h1>
              <p className="text-[var(--text-body)] text-[#b8b4c9] mb-6">
                Scan the QR code to get your code, then enter it below.
              </p>
              <form onSubmit={handleVerify} className="w-full">
                <Input
                  ref={codeInputRef}
                  label="Verification code"
                  id="gate-code"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setCodeError('');
                  }}
                  error={codeError}
                  autoComplete="one-time-code"
                  autoCapitalize="characters"
                  ariaDescription="Enter the code shown at the event or on the QR scan page."
                />
                {codeSuccess && (
                  <div
                    className="mt-4 p-4 bg-[rgba(74,222,128,0.1)] border border-[rgba(74,222,128,0.2)] rounded-[12px] flex items-center gap-3"
                    role="alert"
                  >
                    <CheckCircle className="h-5 w-5 text-[#4ade80] flex-shrink-0" strokeWidth={2} />
                    <p className="text-[var(--text-subhead)] text-[#4ade80]">Code accepted. Proceeding…</p>
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={isVerifying}
                  variant="primary"
                  size="lg"
                  className="w-full mt-6"
                >
                  {isVerifying ? 'Verifying…' : 'Continue'}
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* ----- Step 2: Form ----- */}
        {step === 'form' && (
          <div className="card-standard w-full p-6 sm:p-8">
            <h2
              className="text-[var(--text-title-2)] text-white mb-2"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Your details
            </h2>
            <p className="text-[var(--text-body)] text-[#b8b4c9] mb-6">
              We need a few details to complete your registration.
            </p>
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <Input
                label="Full name"
                id="gate-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((p) => ({ ...p, name: '' }));
                }}
                error={errors.name}
                autoComplete="name"
              />
              <Input
                label="Section"
                id="gate-section"
                type="text"
                value={section}
                onChange={(e) => {
                  setSection(e.target.value);
                  if (errors.section) setErrors((p) => ({ ...p, section: '' }));
                }}
                error={errors.section}
                autoComplete="off"
              />
              <SearchableSelect
                label="Program"
                id="gate-program"
                options={PROGRAMS}
                value={program}
                onChange={(v) => {
                  setProgram(v);
                  if (errors.program) setErrors((p) => ({ ...p, program: '' }));
                }}
                placeholder=""
                error={errors.program}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                size="lg"
                className="w-full mt-2"
              >
                {isSubmitting ? 'Submitting…' : 'Submit'}
              </Button>
            </form>
          </div>
        )}

        {/* ----- Success state ----- */}
        {step === 'success' && (
          <div className="card-standard w-full p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[rgba(74,222,128,0.2)] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-[#4ade80]" strokeWidth={2} aria-hidden />
            </div>
            <h2
              className="text-[var(--text-title-1)] text-white mb-3"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              You're all set
            </h2>
            <p className="text-[var(--text-body)] text-[#b8b4c9] mb-6">
              Thanks for registering. We've saved your details.
            </p>
            <p className="text-[var(--text-footnote)] text-[#b8b4c9]">
              You can close this page or scan again to register someone else.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};

export default GateLandingPage;
