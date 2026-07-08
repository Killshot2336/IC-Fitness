import { test, expect } from '@playwright/test';

test('page loads without console errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(`PAGE: ${err.message}`));
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !msg.text().includes('compute-pressure')) {
      errors.push(`CONSOLE: ${msg.text()}`);
    }
  });

  await page.goto('/index.html');
  await page.waitForSelector('#loader.hidden', { timeout: 5000 });
  await expect(page.locator('.voidline-config-sidebar')).toBeVisible();

  await page.locator('#membership').scrollIntoViewIfNeeded();
  await page.locator('.join-btn').first().click();
  await page.keyboard.press('Escape');

  expect(errors).toEqual([]);
});

test('react portal mounts on HTTP', async ({ page }) => {
  const response = await page.goto('/index.html');
  expect(response?.status()).toBe(200);
  await expect(page.locator('.voidline-config-sidebar')).toBeVisible();
});
