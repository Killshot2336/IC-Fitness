import { PLATFORM_MODULES, formatCurrency } from '../platformConfig';
import { useTier } from '../context/TierContext';

export default function VoidlineConfigSidebar() {
  const { modules, toggleModule, investment } = useTier();

  return (
    <aside className="voidline-config-sidebar" aria-label="Voidline Platform Configuration Portal">
      <div className="voidline-sidebar-body">
        <div className="voidline-sidebar-header">
          <i className="fas fa-layer-group" aria-hidden="true" />
          <div>
            <h3>Voidline</h3>
            <span className="voidline-subtitle">Platform Configuration Portal</span>
          </div>
        </div>

        <p className="voidline-sidebar-desc">
          Configure your IC Fitness digital platform modules. Toggle capabilities to preview
          gated features live.
        </p>

        <fieldset className="voidline-modules">
          <legend className="sr-only">Platform modules</legend>
          {Object.values(PLATFORM_MODULES).map((mod) => {
            const checked = modules[mod.id];
            return (
              <label
                key={mod.id}
                className={`voidline-module-row ${checked ? 'active' : ''} ${mod.required ? 'required' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  disabled={mod.required}
                  onChange={() => toggleModule(mod.id)}
                  aria-describedby={`voidline-price-${mod.id}`}
                />
                <span className="voidline-module-copy">
                  <span className="voidline-module-label">{mod.label}</span>
                  <span className="voidline-module-price" id={`voidline-price-${mod.id}`}>
                    {formatCurrency(mod.price)}
                  </span>
                </span>
              </label>
            );
          })}
        </fieldset>
      </div>

      <footer className="voidline-calculator" aria-live="polite">
        <div className="voidline-total">
          <span>Total Platform Investment:</span>
          <strong>{formatCurrency(investment.total)}</strong>
        </div>
        <div className="voidline-deposit">
          <span>50% Upfront Commitment Deposit:</span>
          <strong>{formatCurrency(investment.deposit)}</strong>
        </div>
      </footer>
    </aside>
  );
}
