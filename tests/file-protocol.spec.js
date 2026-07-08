import { test, expect } from '@playwright/test';
import path from 'path';

test('file:// protocol loads React demo (IIFE bundle)', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !msg.text().includes('compute-pressure')) {
      errors.push(msg.text());
    }
  });

  const fileUrl = 'file://' + path.resolve('/workspace/index.html');
  await page.goto(fileUrl);
  await page.waitForTimeout(3000);

  await expect(page.locator('.voidline-config-sidebar')).toBeVisible();
  expect(errors).toEqual([]);
});
