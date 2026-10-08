import { test, expect } from '@playwright/test';

function luminance([red, green, blue]) {
  const channels = [red, green, blue].map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(first, second) {
  const brightest = Math.max(luminance(first), luminance(second));
  const darkest = Math.min(luminance(first), luminance(second));
  return (brightest + 0.05) / (darkest + 0.05);
}

function rgb(value) {
  return value.match(/\d+/g).slice(0, 3).map(Number);
}

for (const width of [360, 768, 1280]) {
  test(`reste sans débordement horizontal à ${width} px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('/');
    await page.locator('#messages').evaluate((list) => {
      const item = globalThis.document.createElement('li');
      item.textContent = `Vous : ${'a'.repeat(60)}`;
      list.append(item);
    });

    const overflow = await page.evaluate(() => (
      globalThis.document.documentElement.scrollWidth - globalThis.document.documentElement.clientWidth
    ));
    expect(overflow).toBe(0);
    await expect(page.locator('#message')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Envoyer' })).toBeVisible();
  });
}

test('montre un focus clavier visible sur les contrôles', async ({ page }) => {
  await page.goto('/');

  for (let index = 0; index < 6; index += 1) {
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
    const outline = await focused.evaluate((element) => globalThis.getComputedStyle(element).outlineStyle);
    expect(outline).not.toBe('none');
  }
});

test('le contour de focus atteint un contraste de 3 pour 1', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  const focused = page.locator(':focus');
  const colors = await focused.evaluate((element) => {
    const style = globalThis.getComputedStyle(element);
    return { outline: style.outlineColor, background: style.backgroundColor };
  });

  expect(contrast(rgb(colors.outline), rgb(colors.background))).toBeGreaterThanOrEqual(3);
});
