import { describe, it, expect } from 'vitest';
import {
  getDefaultModules,
  calculateInvestment,
  formatCurrency,
  PLATFORM_MODULES,
} from '../src/platformConfig.js';

describe('platformConfig', () => {
  it('defaults baseSite on and optional modules off', () => {
    const modules = getDefaultModules();
    expect(modules.baseSite).toBe(true);
    expect(modules.scheduling).toBe(false);
    expect(modules.ecommerce).toBe(false);
    expect(modules.memberPortal).toBe(false);
  });

  it('calculates total and 50% deposit', () => {
    const { total, deposit } = calculateInvestment(getDefaultModules());
    expect(total).toBe(1000);
    expect(deposit).toBe(500);
    expect(formatCurrency(total)).toBe('$1,000');
    expect(formatCurrency(deposit)).toBe('$500');
  });

  it('sums all modules when enabled', () => {
    const allOn = Object.fromEntries(
      Object.keys(PLATFORM_MODULES).map((key) => [key, true])
    );
    const { total, deposit } = calculateInvestment(allOn);
    expect(total).toBe(5000);
    expect(deposit).toBe(2500);
  });
});
