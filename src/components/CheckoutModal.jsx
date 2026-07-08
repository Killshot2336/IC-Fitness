import { useState, useEffect } from 'react';
import FeatureGate from './FeatureGate';
import { FEATURE_REQUIREMENTS } from '../tierConfig';

const LOADING_MS = 1500;

export default function CheckoutModal({ isOpen, plan, price, recurring = true, onClose }) {
  const [step, setStep] = useState('form'); // form | loading | success
  const [form, setForm] = useState({ name: '', email: '', card: '', expiry: '', cvc: '' });

  useEffect(() => {
    if (!isOpen) {
      setStep('form');
      setForm({ name: '', email: '', card: '', expiry: '', cvc: '' });
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const resetAndClose = () => {
    onClose();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('loading');
    setTimeout(() => setStep('success'), LOADING_MS);
  };

  const formatCard = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
  };

  const formatExpiry = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay react-modal active"
      onClick={(e) => e.target === e.currentTarget && step !== 'loading' && resetAndClose()}
      role="presentation"
    >
      <div className="modal" role="dialog" aria-labelledby="paymentTitle" aria-modal="true">
        <button
          type="button"
          className="modal-close"
          onClick={resetAndClose}
          aria-label="Close"
          disabled={step === 'loading'}
        >
          &times;
        </button>

        <FeatureGate requiredTier={FEATURE_REQUIREMENTS.checkout}>
          {step === 'form' && (
            <>
              <h2 id="paymentTitle">Complete Purchase</h2>
              <p className="checkout-plan-summary">
                Plan: <strong>{plan}</strong> — $<strong>{price}</strong>
                {recurring ? '/mo' : ''}
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="payName">Full Name *</label>
                  <input
                    id="payName"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="payEmail">Email *</label>
                  <input
                    id="payEmail"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="payCard">Card Number *</label>
                  <input
                    id="payCard"
                    required
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    value={form.card}
                    onChange={(e) => setForm({ ...form, card: formatCard(e.target.value) })}
                  />
                </div>
                <div className="checkout-card-row">
                  <div className="form-group">
                    <label htmlFor="payExpiry">Expiry *</label>
                    <input
                      id="payExpiry"
                      required
                      placeholder="MM/YY"
                      value={form.expiry}
                      onChange={(e) => setForm({ ...form, expiry: formatExpiry(e.target.value) })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="payCvc">CVC *</label>
                    <input
                      id="payCvc"
                      required
                      inputMode="numeric"
                      placeholder="123"
                      maxLength={4}
                      value={form.cvc}
                      onChange={(e) =>
                        setForm({ ...form, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })
                      }
                    />
                  </div>
                </div>
                <button type="submit" className="form-btn">
                  <i className="fas fa-lock" aria-hidden="true" /> Secure Checkout
                </button>
                <p className="checkout-powered-by">Powered by Stripe (demo mode)</p>
              </form>
            </>
          )}

          {step === 'loading' && (
            <div className="checkout-loading" role="status" aria-live="polite">
              <div className="checkout-spinner" aria-hidden="true" />
              <h2>Processing Payment</h2>
              <p>Please wait while we secure your membership…</p>
            </div>
          )}

          {step === 'success' && (
            <div className="checkout-success">
              <div className="checkout-success-icon" aria-hidden="true">
                <i className="fas fa-check-circle" />
              </div>
              <h2>Payment Successful!</h2>
              <p>
                Welcome to IC Fitness, <strong>{form.name || 'Member'}</strong>!
              </p>
              <p className="checkout-success-detail">
                Your <strong>{plan}</strong> membership is now active. A confirmation email was sent
                to <strong>{form.email}</strong>.
              </p>
              <button type="button" className="form-btn" onClick={resetAndClose}>
                Continue
              </button>
            </div>
          )}
        </FeatureGate>
      </div>
    </div>
  );
}
