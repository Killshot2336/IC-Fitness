/** Voidline Platform Configuration — module pricing matrix */
export const PLATFORM_MODULES = {
  baseSite: {
    id: 'baseSite',
    price: 1000,
    label: 'Core Digital Front Desk Platform',
    default: true,
    required: true,
  },
  scheduling: {
    id: 'scheduling',
    price: 1000,
    label: 'Dynamic Class Scheduling Module',
    default: false,
  },
  ecommerce: {
    id: 'ecommerce',
    price: 1000,
    label: 'Stripe E-Commerce Merchandise Shop',
    default: false,
  },
  memberPortal: {
    id: 'memberPortal',
    price: 2000,
    label: '#ICFamily Member Portal & Perks Hub',
    default: false,
  },
};

/** Maps interactive demo features to required platform modules */
export const FEATURE_MODULES = {
  checkout: 'baseSite',
  classSchedule: 'scheduling',
  ecommerceCheckout: 'ecommerce',
  memberPortal: 'memberPortal',
  blendPerk: 'memberPortal',
};

export function getDefaultModules() {
  return Object.fromEntries(
    Object.entries(PLATFORM_MODULES).map(([key, mod]) => [key, mod.default])
  );
}

export function getModuleLabel(moduleId) {
  return PLATFORM_MODULES[moduleId]?.label ?? moduleId;
}

export function calculateInvestment(modules) {
  const total = Object.entries(modules).reduce((sum, [key, enabled]) => {
    if (!enabled) return sum;
    return sum + (PLATFORM_MODULES[key]?.price ?? 0);
  }, 0);
  return { total, deposit: total * 0.5 };
}

export function formatCurrency(amount) {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}
