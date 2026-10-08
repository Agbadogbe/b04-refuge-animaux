import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('ne présente aucune violation d’accessibilité automatique', async ({ page }) => {
  await page.goto('/');
  const result = await new AxeBuilder({ page }).analyze();
  expect(result.violations).toEqual([]);
});
