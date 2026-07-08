import { test, expect } from '@playwright/test';

async function selectTier(page, tierName) {
  await page.locator('.dev-tier-btn').filter({ hasText: tierName }).click();
}

async function waitForLoader(page) {
  await page.waitForSelector('#loader.hidden', { timeout: 5000 });
}

test.describe('IC Fitness Tier Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
    await waitForLoader(page);
    await expect(page.locator('.dev-tier-sidebar')).toBeVisible();
  });

  test('dev sidebar renders and switches tiers', async ({ page }) => {
    await expect(page.locator('.dev-tier-btn.active')).toContainText('Basic');
    await selectTier(page, 'Premium');
    await expect(page.locator('.dev-tier-btn.active')).toContainText('Premium');
    await selectTier(page, 'Elite');
    await expect(page.locator('.dev-tier-btn.active')).toContainText('Elite');
  });

  test('class schedule locked on Basic, reserve works on Premium', async ({ page }) => {
    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(page.locator('.schedule-section .feature-locked-overlay')).toBeVisible();

    await selectTier(page, 'Premium');
    await expect(page.locator('.schedule-section .feature-locked-overlay')).toHaveCount(0);

    const firstReserve = page.locator('.schedule-reserve-btn').first();
    await expect(firstReserve).toHaveText('Reserve');
    await firstReserve.click();
    await expect(firstReserve).toHaveText('Reserved');
    await expect(firstReserve).toBeDisabled();
    await expect(page.locator('.seats-count').first()).toHaveText('14 left');
  });

  test('checkout shows loading spinner then success', async ({ page }) => {
    await page.locator('#membership').scrollIntoViewIfNeeded();
    await page.locator('.join-btn').first().click();

    await expect(page.locator('#paymentTitle')).toBeVisible();
    await page.locator('#payName').fill('Test User');
    await page.locator('#payEmail').fill('test@example.com');
    await page.locator('#payCard').fill('4242424242424242');
    await page.locator('#payExpiry').fill('12/28');
    await page.locator('#payCvc').fill('123');
    await page.locator('button.form-btn', { hasText: 'Secure Checkout' }).click();

    await expect(page.locator('.checkout-loading')).toBeVisible();
    await expect(page.locator('.checkout-success')).toBeVisible({ timeout: 3000 });
    await expect(page.locator('.checkout-success')).toContainText('Payment Successful');
  });

  test('checkout locked overlay when tier below Basic is impossible; verify form visible on Basic', async ({ page }) => {
    await selectTier(page, 'Basic');
    await page.locator('#membership').scrollIntoViewIfNeeded();
    await page.locator('.join-btn').first().click();
    await expect(page.locator('.react-modal .feature-locked-overlay')).toHaveCount(0);
    await expect(page.locator('#paymentTitle')).toBeVisible();
  });

  test('member portal login and dashboard on Premium', async ({ page }) => {
    await selectTier(page, 'Basic');
    await page.locator('#loginBtn').click();
    await expect(page.locator('.react-modal .feature-locked-overlay')).toBeVisible();

    await page.keyboard.press('Escape');
    await selectTier(page, 'Premium');
    await page.locator('#loginBtn').click();
    await expect(page.locator('#portalTitle')).toContainText('Member Login');
    await page.locator('#demoLoginInput').fill('demo-user');
    await page.locator('button.form-btn', { hasText: 'Sign In' }).click();
    await expect(page.locator('#portalTitle')).toContainText('Member Dashboard');
    await expect(page.locator('.tracker-stat .val').first()).toHaveText('12');
  });

  test('blend perk QR visible only on Elite', async ({ page }) => {
    await selectTier(page, 'Premium');
    await page.locator('#loginBtn').click();
    await page.locator('#demoLoginInput').fill('elite-test');
    await page.locator('button.form-btn', { hasText: 'Sign In' }).click();
    await expect(page.locator('.blend-perk-gate .feature-locked-overlay')).toBeVisible();

    await page.locator('.react-modal .modal-close').first().click();
    await selectTier(page, 'Elite');
    await page.locator('#loginBtn').click();
    await page.locator('#demoLoginInput').fill('elite-test');
    await page.locator('button.form-btn', { hasText: 'Sign In' }).click();
    await expect(page.locator('.blend-qr-code')).toBeVisible();
    await expect(page.locator('.blend-perk-gate .feature-locked-overlay')).toHaveCount(0);
  });

  test('escape closes react checkout modal properly', async ({ page }) => {
    await page.locator('#membership').scrollIntoViewIfNeeded();
    await page.locator('.join-btn').first().click();
    await expect(page.locator('#paymentTitle')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#paymentTitle')).toHaveCount(0);

    // Re-open should work
    await page.locator('.join-btn').first().click();
    await expect(page.locator('#paymentTitle')).toBeVisible();
  });

  test('log workout increments tracker', async ({ page }) => {
    await selectTier(page, 'Premium');
    await page.locator('#loginBtn').click();
    await page.locator('#demoLoginInput').fill('tracker');
    await page.locator('button.form-btn', { hasText: 'Sign In' }).click();
    const before = await page.locator('.tracker-stat .val').first().textContent();
    await page.locator('.dashboard-log-btn').click();
    const after = await page.locator('.tracker-stat .val').first().textContent();
    expect(Number(after)).toBe(Number(before) + 1);
  });
});
