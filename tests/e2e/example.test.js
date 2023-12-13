import { test, expect } from '@playwright/test';

test.describe('browser tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://whatismybrowser.com/');
  });

  test('should display correct browser', async ({ page }) => {
    const browser = await page.$eval(
      '.string-major',
      (element) => element.innerHTML,
    );
    expect(browser).toContain('Chrome');
  });
});
