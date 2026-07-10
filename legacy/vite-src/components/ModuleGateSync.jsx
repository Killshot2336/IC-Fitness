import { useEffect } from 'react';
import { useTier } from '../context/TierContext';

const GATED_BUTTONS = [
  { selector: '.shop-btn', module: 'ecommerce', label: 'Add to Cart' },
  { selector: '.class-card .reserve-btn', module: 'scheduling', label: 'Reserve Spot' },
];

/**
 * Syncs vanilla HTML action buttons with Voidline module state.
 * Locked modules show "Module Locked" and block interaction.
 */
export default function ModuleGateSync() {
  const { modules } = useTier();

  useEffect(() => {
    GATED_BUTTONS.forEach(({ selector, module, label }) => {
      const enabled = Boolean(modules[module]);
      document.querySelectorAll(selector).forEach((btn) => {
        if (!btn.dataset.gateLabel) btn.dataset.gateLabel = label;
        btn.textContent = enabled ? btn.dataset.gateLabel : 'Module Locked';
        btn.classList.toggle('module-locked', !enabled);
        btn.setAttribute('aria-disabled', enabled ? 'false' : 'true');
      });
    });
  }, [modules]);

  return null;
}
