import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test('should display the contact form in Persian', async ({ page }) => {
    await page.goto('/fa/contact');
    await expect(page.locator('h1')).toHaveText('بیایید صحبت کنیم');
    await expect(page.locator('label[for="name"]')).toHaveText('نام');
  });

  test('should have a submit button in English', async ({ page }) => {
    await page.goto('/en/contact');
    await expect(page.locator('button[type="submit"]')).toHaveText('Submit');
  });
});
