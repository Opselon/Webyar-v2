// tests/i18n.spec.ts
import { test, expect } from '@playwright/test';

test.describe('UI Layout and i18n', () => {
  test('should display the header and footer in Persian', async ({ page }) => {
    await page.goto('/fa');
    await expect(page.locator('header .logo')).toHaveText('SEO Agency');
    await expect(page.locator('footer')).toContainText('تمامی حقوق محفوظ است.');
  });

  test('should display translated navigation and CTA in Persian', async ({ page }) => {
    await page.goto('/fa');
    await expect(page.locator('.nav-link').first()).toHaveText('خدمات');
    await expect(page.locator('.cta-button')).toHaveText('درخواست مشاوره');
  });

  test('should display translated navigation and CTA in English', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('.nav-link').first()).toHaveText('Services');
    await expect(page.locator('.cta-button')).toHaveText('Request a Consultation');
  });

  test('should switch language from Persian to English', async ({ page }) => {
    await page.goto('/fa');
    await page.click('a.lang-btn[href="/en"]');
    await page.waitForURL('/en');
    await expect(page.locator('h1')).toHaveText('Hello World!');
  });

  test('should redirect from / to /fa', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL('/fa');
    expect(page.url()).toContain('/fa');
  });

  test('should return 404 for an unsupported language', async ({ page }) => {
    const response = await page.goto('/es');
    expect(response?.status()).toBe(404);
  });
});
