import { useTier } from '../context/TierContext';
import { getRequiredTierLabel } from '../tierConfig';

/**
 * Wraps demo features with a glassmorphism "Feature Locked" overlay
 * when the developer sidebar tier doesn't meet the requirement.
 */
export default function FeatureGate({ feature, requiredTier, children, className = '' }) {
  const { isFeatureUnlocked } = useTier();
  const unlocked = isFeatureUnlocked(requiredTier);

  return (
    <div className={`feature-gate ${className}`} data-unlocked={unlocked}>
      <div className={`feature-gate-content ${unlocked ? '' : 'feature-gate-blurred'}`}>
        {children}
      </div>
      {!unlocked && (
        <div className="feature-locked-overlay" role="status" aria-label="Feature locked">
          <div className="feature-locked-card">
            <i className="fas fa-lock" aria-hidden="true" />
            <h4>Feature Locked</h4>
            <p>
              Requires <strong>{getRequiredTierLabel(requiredTier)}</strong> tier
            </p>
            <span className="feature-locked-hint">Select tier in Dev Sidebar →</span>
          </div>
        </div>
      )}
    </div>
  );
}
