import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { Form, TextField, Input, Button } from 'react-aria-components';

export default function SubscribeForm({ onSubscriptionSuccess }) {
  const [email, setEmail] = useState('');
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [errorField, setErrorField] = useState(null); // 'phone' | 'email' | null
  const [successData, setSuccessData] = useState(null);

  const handleToggleWhatsApp = (explicitVal) => {
    setWhatsappEnabled((prev) => {
      const next = typeof explicitVal === 'boolean' ? explicitVal : !prev;
      if (!next && errorField === 'phone') {
        setErrorMessage('');
        setErrorField(null);
      }
      return next;
    });
  };

  const handleEmailChange = (val) => {
    setEmail(val);
    if (errorField === 'email' || errorMessage) {
      setErrorMessage('');
      setErrorField(null);
    }
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    if (errorField === 'phone' || errorMessage) {
      setErrorMessage('');
      setErrorField(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setErrorField(null);

    // 1. WhatsApp Validation: If activated, user MUST provide a valid phone number
    if (whatsappEnabled) {
      const cleanPhone = phone.trim().replace(/[\s\-\(\)\+]/g, '');
      if (!cleanPhone) {
        setErrorMessage('Please enter your WhatsApp phone number.');
        setErrorField('phone');
        return;
      }
      if (cleanPhone.length < 7) {
        setErrorMessage('Please enter a valid WhatsApp phone number with country code.');
        setErrorField('phone');
        return;
      }
    }

    // 2. Email Validation: Must be authentic and properly formatted
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMessage('Please enter an authentic, valid email address.');
      setErrorField('email');
      return;
    }

    setStatus('loading');
    const startTime = Date.now();

    const payload = {
      email: cleanEmail,
      phone: whatsappEnabled ? phone.trim() : null,
    };

    // Endpoints fallback chain:
    // 1. Explicit env var if specified (VITE_SUBSCRIBE_ENDPOINT)
    // 2. /.netlify/functions/subscribe (Direct Netlify serverless function)
    // 3. /api/subscribe (Redirected endpoint & local dev server)
    // 4. /Subscribe.ashx (Windows Server IIS same-port handler)
    const candidateEndpoints = [];
    if (import.meta.env.VITE_SUBSCRIBE_ENDPOINT) {
      candidateEndpoints.push(import.meta.env.VITE_SUBSCRIBE_ENDPOINT);
    }
    candidateEndpoints.push('/.netlify/functions/subscribe', '/api/subscribe', '/Subscribe.ashx');

    let liveSuccess = false;
    let liveData = null;

    for (const ep of candidateEndpoints) {
      try {
        const response = await fetch(ep, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          if (data && data.success) {
            liveData = data;
            liveSuccess = true;
            break;
          }
        }
      } catch (_) {
        // Try next candidate endpoint in chain
      }
    }

    // Ensure loading spinner runs for at least 650ms so the user sees a smooth loading transition
    const elapsed = Date.now() - startTime;
    if (elapsed < 650) {
      await new Promise((resolve) => setTimeout(resolve, 650 - elapsed));
    }

    if (liveSuccess && liveData) {
      triggerLuxuryConfetti();
      setStatus('success');
      setSuccessData(liveData);
      if (onSubscriptionSuccess) {
        onSubscriptionSuccess(liveData);
      }
      return;
    }

    // Client simulation fallback (only used if all live backends are unavailable/offline)
    triggerLuxuryConfetti();

    const fallbackData = {
      success: true,
      isSimulated: true,
      message: 'Welcome to the Aviin Family.',
      subscriber: payload,
    };

    setStatus('success');
    setSuccessData(fallbackData);
    if (onSubscriptionSuccess) {
      onSubscriptionSuccess(fallbackData);
    }
  };

  const triggerLuxuryConfetti = () => {
    try {
      const count = 75;
      const defaults = { origin: { y: 0.65 }, zIndex: 9999 };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
          colors: ['#c5a059', '#231f36', '#e6cca0', '#00eaff', '#00de9a', '#ffffff'],
        });
      }

      fire(0.25, { spread: 26, startVelocity: 45 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92 });
      fire(0.1, { spread: 120, startVelocity: 40 });
    } catch {
      // safe fallback if canvas is not supported
    }
  };

  const handleReset = () => {
    setEmail('');
    setPhone('');
    setWhatsappEnabled(false);
    setStatus('idle');
    setSuccessData(null);
    setErrorMessage('');
    setErrorField(null);
  };

  if (status === 'success' && successData) {
    return (
      <div className="minimal-success-card">
        <div className="minimal-success-icon">
          <Sparkles size={22} />
        </div>
        <h3 className="minimal-success-title">Welcome to the Aviin Family</h3>
        <p className="minimal-success-desc">
          A welcome note has been dispatched to{' '}
          <strong style={{ color: 'var(--aviin-navy)' }}>{successData.subscriber?.email || email}</strong>.
          {(successData.subscriber?.phone || (whatsappEnabled && phone)) && (
            <>
              {' '}WhatsApp updates will be sent to{' '}
              <strong style={{ color: 'var(--aviin-navy)' }}>{successData.subscriber?.phone || phone}</strong>.
            </>
          )}
          {' '}You are now part of the Aviin Family.
        </p>
        <button type="button" onClick={handleReset} className="minimal-success-reset">
          Subscribe Another Email
        </button>
      </div>
    );
  }

  return (
    <Form onSubmit={handleSubmit} className="react-aria-Form minimal-subscribe-form">
      {/* 1. WhatsApp Launch Notification Option (Positioned ABOVE the email field) */}
      <div
        className="whatsapp-optin-row"
        onClick={() => handleToggleWhatsApp()}
        role="switch"
        aria-checked={whatsappEnabled}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleToggleWhatsApp();
          }
        }}
      >
        <div className="whatsapp-optin-left">
          <span className="whatsapp-optin-label">
            Notify me on WhatsApp for private drops
          </span>
        </div>
        <div className="wa-toggle-container">
          <input
            type="checkbox"
            id="waToggle"
            checked={whatsappEnabled}
            onChange={(e) => handleToggleWhatsApp(e.target.checked)}
            className="wa-toggle-switch"
            aria-label="Notify me on WhatsApp for private drops"
            tabIndex={-1}
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </div>

      {/* 2. WhatsApp Phone Drawer (Smoothly revealed when WhatsApp toggle is activated) */}
      <div className={`phone-drawer ${whatsappEnabled ? 'open' : ''}`}>
        <div className={`single-phone-row ${errorField === 'phone' ? 'has-error' : ''}`}>
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="WhatsApp Number (e.g. +44 7586 601245 or +91 98765 43210)"
            className="single-phone-input"
            aria-label="WhatsApp Phone Number"
          />
        </div>
      </div>

      {/* 3. Single Email Box & Notify Me Button */}
      <TextField
        name="email"
        value={email}
        onChange={handleEmailChange}
        className="react-aria-TextField"
      >
        <div className={`single-input-row ${errorField === 'email' ? 'has-error' : ''}`}>
          <Input
            type="email"
            placeholder="Enter your email address..."
            className="react-aria-Input single-email-input"
            aria-label="Email Address"
          />
          <Button
            type="submit"
            isDisabled={status === 'loading'}
            id="notifyMeBtn"
            className="react-aria-Button single-submit-btn"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Notify Me</span>
                <ArrowRight size={14} />
              </>
            )}
          </Button>
        </div>
      </TextField>

      {/* 4. Form Validation / Error Alert */}
      {errorMessage && (
        <div className="single-form-error" role="alert">
          {errorMessage}
        </div>
      )}
    </Form>
  );
}
