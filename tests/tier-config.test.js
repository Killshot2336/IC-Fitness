import { describe, it, expect } from 'vitest';
import { tierMeetsRequirement, FEATURE_REQUIREMENTS } from '../src/tierConfig.js';

describe('tierMeetsRequirement', () => {
  it('Basic unlocks checkout only', () => {
    expect(tierMeetsRequirement('basic', FEATURE_REQUIREMENTS.checkout)).toBe(true);
    expect(tierMeetsRequirement('basic', FEATURE_REQUIREMENTS.classSchedule)).toBe(false);
    expect(tierMeetsRequirement('basic', FEATURE_REQUIREMENTS.memberPortal)).toBe(false);
    expect(tierMeetsRequirement('basic', FEATURE_REQUIREMENTS.blendPerk)).toBe(false);
  });

  it('Premium unlocks schedule and portal', () => {
    expect(tierMeetsRequirement('premium', FEATURE_REQUIREMENTS.classSchedule)).toBe(true);
    expect(tierMeetsRequirement('premium', FEATURE_REQUIREMENTS.memberPortal)).toBe(true);
    expect(tierMeetsRequirement('premium', FEATURE_REQUIREMENTS.blendPerk)).toBe(false);
  });

  it('Elite unlocks all features', () => {
    expect(tierMeetsRequirement('elite', FEATURE_REQUIREMENTS.blendPerk)).toBe(true);
  });
});
