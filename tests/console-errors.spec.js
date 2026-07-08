import { test, expect } from '@playwright/test';

test('page loads without console errors', async ({ page }) => {
  const errors = [];
  const warnings = [];

  page.on('pageerror', (err) => errors.push(`PAGE: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !msg.text().includes('compute-pressure')) {
      errors.push(`CONSOLE: ${msg.text()}`);
    }
  });

  await page.goto('/index.html');
  await page.waitForSelector('#loader.hidden', { timeout: 5000 });
  await page.waitForSelector('.dev-tier-sidebar', { timeout: 5000 });

  // Exercise main flows
  await page.locator('#membership').scrollIntoViewIfNeeded();
  await page.locator('.join-btn').first().click();
  await page.waitForSelector('#paymentTitle');
  await page.keyboard.press('Escape');

  await page.locator('.dev-tier-btn').filter({ hasText: 'Premium' }).click();
  await page.locator('#services').scrollIntoViewIfNeeded();
  await page.locator('.schedule-reserve-btn').first().click();

  await page.locator('#loginBtn').click();
  await page.locator('#demoLoginInput').fill('test');
  await page.keyboard.press('Escape');

  if (errors.length) {
    console.log('ERRORS FOUND:', errors);
  }
  expect(errors, `Console errors: ${errors.join('\n')}`).toEqual([]);
});

test('file protocol note - modules require HTTP server', async ({ page }) => {
  // Simulate what breaks when assets fail to load
  const response = await page.goto('/index.html');
  expect(response?.status()).toBe(200);
  await expect(page.locator('#tier-demo-root')).toBeAttached();
  const reactMounted = await page.locator('.dev-tier-sidebar').count();
  expect(reactMounted).toBe(1);
});
