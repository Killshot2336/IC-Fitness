/** Tier definitions — maps sidebar selection to unlocked demo features */
export const TIERS = {
  basic: {
    id: 'basic',
    name: 'Basic',
    price: 35,
    level: 1,
    color: '#e0e0e0',
  },
  premium: {
    id: 'premium',
    name: 'Premium',
    price: 45,
    level: 2,
    color: '#39FF14',
  },
  elite: {
    id: 'elite',
    name: 'Elite',
    price: 75,
    level: 3,
    color: '#FF5733',
  },
};

/** Minimum tier required per interactive demo feature */
export const FEATURE_REQUIREMENTS = {
  checkout: 'basic',
  classSchedule: 'premium',
  memberPortal: 'premium',
  blendPerk: 'elite',
};

export function tierMeetsRequirement(selectedTierId, requiredTierId) {
  const selected = TIERS[selectedTierId]?.level ?? 0;
  const required = TIERS[requiredTierId]?.level ?? 99;
  return selected >= required;
}

export function getRequiredTierLabel(requiredTierId) {
  return TIERS[requiredTierId]?.name ?? requiredTierId;
}
