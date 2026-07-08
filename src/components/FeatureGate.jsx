import { useTier } from '../context/TierContext';
import { getModuleLabel } from '../platformConfig';

/**
 * Wraps demo features with a glassmorphism "Feature Locked" overlay
 * when the matching Voidline platform module is not enabled.
 */
export default function FeatureGate({ requiredModule, children, className = '' }) {
  const { isModuleEnabled } = useTier();
  const unlocked = isModuleEnabled(requiredModule);

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
              Enable <strong>{getModuleLabel(requiredModule)}</strong> in the Voidline portal
            </p>
            <span className="feature-locked-hint">Toggle module in sidebar →</span>
          </div>
        </div>
      )}
    </div>
  );
}
