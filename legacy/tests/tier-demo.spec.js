import { test, expect } from '@playwright/test';

async function toggleModule(page, label) {
  const row = page.locator('.voidline-module-row').filter({ hasText: label });
  const input = row.locator('input[type="checkbox"]');
  if (!(await input.isChecked())) {
    await row.click();
  }
}

async function waitForLoader(page) {
  await page.waitForSelector('#loader.hidden', { timeout: 5000 });
}

test.describe('Voidline Platform Configuration Portal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
    await waitForLoader(page);
    await expect(page.locator('.voidline-config-sidebar')).toBeVisible();
  });

  test('sidebar shows pricing matrix and default calculator totals', async ({ page }) => {
    await expect(page.locator('.voidline-subtitle')).toContainText('Platform Configuration Portal');
    await expect(page.locator('.voidline-module-row').filter({ hasText: 'Core Digital Front Desk' })).toBeVisible();
    await expect(page.locator('.voidline-total strong')).toHaveText('$1,000');
    await expect(page.locator('.voidline-deposit strong')).toHaveText('$500');
  });

  test('calculator updates when modules are toggled', async ({ page }) => {
    await toggleModule(page, 'Dynamic Class Scheduling');
    await toggleModule(page, 'Stripe E-Commerce');
    await toggleModule(page, '#ICFamily Member Portal');
    await expect(page.locator('.voidline-total strong')).toHaveText('$5,000');
    await expect(page.locator('.voidline-deposit strong')).toHaveText('$2,500');
  });

  test('scheduling module gates class reserve', async ({ page }) => {
    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(page.locator('.schedule-section .feature-locked-overlay')).toBeVisible();

    await toggleModule(page, 'Dynamic Class Scheduling');
    await expect(page.locator('.schedule-section .feature-locked-overlay')).toHaveCount(0);

    const firstReserve = page.locator('.schedule-reserve-btn').first();
    await firstReserve.click();
    await expect(firstReserve).toHaveText('Reserved');
    await expect(page.locator('.seats-count').first()).toHaveText('14 left');
  });

  test('baseSite enables membership checkout by default', async ({ page }) => {
    await page.locator('#membership').scrollIntoViewIfNeeded();
    await page.locator('.join-btn').first().click();
    await expect(page.locator('#paymentTitle')).toBeVisible();
  });

  test('checkout shows loading spinner then success', async ({ page }) => {
    await page.locator('#membership').scrollIntoViewIfNeeded();
    await page.locator('.join-btn').first().click();
    await page.locator('#payName').fill('Test User');
    await page.locator('#payEmail').fill('test@example.com');
    await page.locator('#payCard').fill('4242424242424242');
    await page.locator('#payExpiry').fill('12/28');
    await page.locator('#payCvc').fill('123');
    await page.locator('button.form-btn', { hasText: 'Secure Checkout' }).click();
    await expect(page.locator('.checkout-loading')).toBeVisible();
    await expect(page.locator('.checkout-success')).toBeVisible({ timeout: 3000 });
  });

  test('member portal module gates login', async ({ page }) => {
    await page.locator('#loginBtn').click();
    await expect(page.locator('.react-modal .feature-locked-overlay')).toBeVisible();

    await page.keyboard.press('Escape');
    await toggleModule(page, '#ICFamily Member Portal');
    await page.locator('#loginBtn').click();
    await page.locator('#demoLoginInput').fill('demo-user');
    await page.locator('button.form-btn', { hasText: 'Sign In' }).click();
    await expect(page.locator('#portalTitle')).toContainText('Member Dashboard');
    await expect(page.locator('.blend-qr-code')).toBeVisible();
  });

  test('escape closes react checkout modal properly', async ({ page }) => {
    await page.locator('#membership').scrollIntoViewIfNeeded();
    await page.locator('.join-btn').first().click();
    await page.keyboard.press('Escape');
    await expect(page.locator('#paymentTitle')).toHaveCount(0);
  });

  test('shop and class reserve buttons show Module Locked without modules', async ({ page }) => {
    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(page.locator('.class-card .reserve-btn').first()).toHaveText('Module Locked');

    await page.locator('#shop').scrollIntoViewIfNeeded();
    await expect(page.locator('.shop-btn').first()).toHaveText('Module Locked');
  });

  test('enabling modules unlocks shop and class reserve buttons', async ({ page }) => {
    await toggleModule(page, 'Dynamic Class Scheduling');
    await toggleModule(page, 'Stripe E-Commerce');

    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(page.locator('.class-card .reserve-btn').first()).toHaveText('Reserve Spot');

    await page.locator('#shop').scrollIntoViewIfNeeded();
    await expect(page.locator('.shop-btn').first()).toHaveText('Add to Cart');
  });
});
