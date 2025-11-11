// tests/i18n.spec.ts
import { test, expect } from '@playwright/test';

test.describe('i18n and Routing', () => {
  test('should redirect from / to /fa', async ({ page }) => {
    await page.goto('/');
    await page.waitForURL('/fa');
    expect(page.url()).toContain('/fa');
  });

  test('should return 200 for /fa and display the correct greeting', async ({ page }) => {
    const response = await page.goto('/fa');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toHaveText('سلام دنیا!');
  });

  test('should return 200 for /en and display the correct greeting', async ({ page }) => {
    const response = await page.goto('/en');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toHaveText('Hello World!');
  });

  test('should return 200 for /ar and display the correct greeting', async ({ page }) => {
    const response = await page.goto('/ar');
    expect(response?.status()).toBe(200);
    await expect(page.locator('body')).toHaveText('مرحبا بالعالم!');
  });

  test('should return 404 for an unsupported language', async ({ page }) => {
    const response = await page.goto('/es');
    expect(response?.status()).toBe(404);
  });
});
