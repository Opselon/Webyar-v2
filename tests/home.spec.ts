import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display the hero section in Persian', async ({ page }) => {
    await page.goto('/fa');
    await expect(page.locator('h1')).toHaveText('آژانس سئو داده‌محور برای رشد واقعی کسب‌وکار شما');
  });

  test('should display the services overview in English', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('.services-overview h2')).toHaveText('Our Services');
    await expect(page.locator('.services-overview .card').first()).toContainText('Technical SEO');
  });
});
