import { TIERS } from '../tierConfig';
import { useTier } from '../context/TierContext';
import { FEATURE_REQUIREMENTS } from '../tierConfig';

const FEATURE_LABELS = {
  checkout: 'Checkout',
  classSchedule: 'Class Schedule',
  memberPortal: 'Member Portal',
  blendPerk: 'Blend & Believe QR',
};

export default function DevTierSidebar() {
  const { selectedTier, setSelectedTier, isFeatureUnlocked } = useTier();

  return (
    <aside className="dev-tier-sidebar" aria-label="Developer tier selector">
      <div className="dev-sidebar-header">
        <i className="fas fa-code" aria-hidden="true" />
        <h3>Dev Tier</h3>
      </div>
      <p className="dev-sidebar-desc">Simulate membership tier to preview gated features.</p>

      <div className="dev-tier-buttons" role="radiogroup" aria-label="Membership tier">
        {Object.values(TIERS).map((tier) => (
          <button
            key={tier.id}
            type="button"
            role="radio"
            aria-checked={selectedTier === tier.id}
            className={`dev-tier-btn ${selectedTier === tier.id ? 'active' : ''}`}
            style={{ '--tier-color': tier.color }}
            onClick={() => setSelectedTier(tier.id)}
          >
            <span className="dev-tier-name">{tier.name}</span>
            <span className="dev-tier-price">${tier.price}/mo</span>
          </button>
        ))}
      </div>

      <div className="dev-feature-status">
        <h4>Feature Access</h4>
        <ul>
          {Object.entries(FEATURE_REQUIREMENTS).map(([key, required]) => {
            const unlocked = isFeatureUnlocked(required);
            return (
              <li key={key} className={unlocked ? 'unlocked' : 'locked'}>
                <i className={`fas fa-${unlocked ? 'check-circle' : 'lock'}`} aria-hidden="true" />
                {FEATURE_LABELS[key]}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
