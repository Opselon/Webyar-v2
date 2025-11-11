import { test, expect } from '@playwright/test';

test.describe('Services Page', () => {
  test('should display the page title in Persian', async ({ page }) => {
    await page.goto('/fa/services');
    await expect(page.locator('h1')).toHaveText('خدمات سئو ۳۶۰ درجه');
  });

  test('should list the services in English', async ({ page }) => {
    await page.goto('/en/services');
    await expect(page.locator('.service-card').first()).toContainText('Technical SEO');
  });
});
