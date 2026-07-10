import { useState, useEffect } from 'react';
import FeatureGate from './FeatureGate';
import { FEATURE_MODULES } from '../platformConfig';

/** Mock QR code SVG for Blend & Believe elite perk */
function BlendQRCode() {
  return (
    <svg
      className="blend-qr-code"
      viewBox="0 0 120 120"
      role="img"
      aria-label="Blend and Believe discount QR code"
    >
      <rect width="120" height="120" fill="#fff" rx="4" />
      <rect x="8" y="8" width="28" height="28" fill="#121212" />
      <rect x="12" y="12" width="20" height="20" fill="#fff" />
      <rect x="16" y="16" width="12" height="12" fill="#121212" />
      <rect x="84" y="8" width="28" height="28" fill="#121212" />
      <rect x="88" y="12" width="20" height="20" fill="#fff" />
      <rect x="92" y="16" width="12" height="12" fill="#121212" />
      <rect x="8" y="84" width="28" height="28" fill="#121212" />
      <rect x="12" y="88" width="20" height="20" fill="#fff" />
      <rect x="16" y="92" width="12" height="12" fill="#121212" />
      {[
        [44, 8], [52, 8], [60, 16], [68, 8], [44, 24], [60, 32], [76, 24],
        [44, 40], [52, 48], [68, 40], [8, 44], [24, 52], [44, 56], [60, 56],
        [76, 56], [92, 44], [108, 52], [44, 68], [52, 76], [68, 68], [44, 84],
        [60, 92], [76, 84], [92, 68], [100, 76], [108, 84], [92, 92], [100, 100],
        [108, 108],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="8" height="8" fill="#121212" />
      ))}
    </svg>
  );
}

export default function MemberPortal({ isOpen, onClose }) {
  const [view, setView] = useState('login'); // login | dashboard
  const [loginInput, setLoginInput] = useState('');
  const [workouts, setWorkouts] = useState(12);
  const [streak, setStreak] = useState(5);
  const [calories, setCalories] = useState(2840);

  useEffect(() => {
    if (!isOpen) {
      setView('login');
      setLoginInput('');
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginInput.trim()) setView('dashboard');
  };

  const logWorkout = () => {
    setWorkouts((w) => w + 1);
    setStreak((s) => s + 1);
    setCalories((c) => c + 320);
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay react-modal active"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div
        className="modal modal-lg"
        role="dialog"
        aria-labelledby="portalTitle"
        aria-modal="true"
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          &times;
        </button>

        <FeatureGate requiredModule={FEATURE_MODULES.memberPortal}>
          {view === 'login' ? (
            <>
              <h2 id="portalTitle">Member Login</h2>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="demoLoginInput">Username or Email</label>
                  <input
                    id="demoLoginInput"
                    type="text"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    placeholder="Enter anything to sign in"
                    autoComplete="username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="demoLoginPass">Password</label>
                  <input
                    id="demoLoginPass"
                    type="password"
                    placeholder="Any text works"
                    autoComplete="current-password"
                  />
                </div>
                <button type="submit" className="form-btn" disabled={!loginInput.trim()}>
                  Sign In
                </button>
                <p className="demo-hint">Demo: any text input grants access</p>
              </form>
            </>
          ) : (
            <>
              <h2 id="portalTitle">Member Dashboard</h2>
              <p className="dashboard-welcome">
                Welcome back, <strong>{loginInput.trim() || 'Member'}</strong>!
              </p>

              <div className="tracker-stats">
                <div className="tracker-stat">
                  <div className="val">{workouts}</div>
                  <div>Workouts This Month</div>
                </div>
                <div className="tracker-stat">
                  <div className="val">{streak}</div>
                  <div>Day Streak</div>
                </div>
                <div className="tracker-stat">
                  <div className="val">{calories.toLocaleString()}</div>
                  <div>Calories Burned</div>
                </div>
              </div>

              <button type="button" className="btn btn-neon dashboard-log-btn" onClick={logWorkout}>
                <i className="fas fa-plus" aria-hidden="true" /> Log Workout
              </button>

              <div className="dashboard-perks">
                <h3>Member Perks</h3>
                <FeatureGate requiredModule={FEATURE_MODULES.blendPerk} className="blend-perk-gate">
                  <div className="blend-perk-card">
                    <div className="blend-perk-info">
                      <h4>
                        <i className="fas fa-blender" aria-hidden="true" /> Blend &amp; Believe
                      </h4>
                      <p>15% off smoothies — scan at checkout</p>
                      <span className="blend-perk-code">ELITE-BNB-2026</span>
                    </div>
                    <BlendQRCode />
                  </div>
                </FeatureGate>
              </div>

              <button type="button" className="btn btn-orange dashboard-signout" onClick={onClose}>
                Sign Out
              </button>
            </>
          )}
        </FeatureGate>
      </div>
    </div>
  );
}
