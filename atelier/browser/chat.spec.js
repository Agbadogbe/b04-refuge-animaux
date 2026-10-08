import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => globalThis.localStorage.clear());
  await page.reload();
});

test('refuse le vide et affiche les messages comme du texte', async ({ page }) => {
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.getByRole('status')).toHaveText('Écrivez un message avant de l’envoyer.');
  await expect(page.locator('#message')).toBeFocused();

  await page.locator('#message').fill('<b>gras</b>');
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.locator('#messages li')).toHaveCount(2);
  await expect(page.locator('#messages li').first()).toHaveText('Vous : <b>gras</b>');
  await expect(page.locator('#messages b')).toHaveCount(0);
});

test('reconnaît les règles personnelles et conserve la conversation', async ({ page }) => {
  for (const message of [' SALUT ', 'plage', 'FENÊTRE']) {
    await page.locator('#message').fill(message);
    await page.getByRole('button', { name: 'Envoyer' }).click();
  }

  await expect(page.locator('#messages li')).toHaveCount(6);
  await expect(page.locator('#messages')).toContainText('Le mot « plage » est bien reconnu.');
  await expect(page.locator('#messages')).toContainText('Le mot « fenêtre » est bien reconnu.');

  await page.reload();
  await expect(page.locator('#messages li')).toHaveCount(6);
});

test('copie une suggestion sans l’envoyer', async ({ page }) => {
  await page.getByRole('button', { name: 'Comment adopter un animal au refuge ?' }).click();
  await expect(page.locator('#message')).toHaveValue('Comment adopter un animal au refuge ?');
  await expect(page.locator('#message')).toBeFocused();
  await expect(page.locator('#messages li')).toHaveCount(0);
  await expect(page.getByRole('status')).toHaveText('Question copiée : modifiez-la ou envoyez-la.');
});

test('résiste à une mémoire corrompue', async ({ page }) => {
  await page.evaluate(() => globalThis.localStorage.setItem('capweb.historique', '{pas du json'));
  await page.reload();

  await expect(page.locator('#messages li')).toHaveCount(0);
  await expect(page.getByRole('status')).toHaveText('La mémoire était illisible : la conversation repart vide.');
  await expect(page.evaluate(() => globalThis.localStorage.getItem('capweb.historique'))).resolves.toBeNull();
});

test('annule puis confirme l’effacement', async ({ page }) => {
  await page.locator('#message').fill('salut');
  await page.getByRole('button', { name: 'Envoyer' }).click();

  page.once('dialog', dialog => dialog.dismiss());
  await page.getByRole('button', { name: 'Effacer la conversation' }).click();
  await expect(page.locator('#messages li')).toHaveCount(2);

  page.once('dialog', dialog => dialog.accept());
  await page.getByRole('button', { name: 'Effacer la conversation' }).click();
  await expect(page.locator('#messages li')).toHaveCount(0);
  await expect(page.evaluate(() => globalThis.localStorage.getItem('capweb.historique'))).resolves.toBeNull();

  await page.reload();
  await expect(page.locator('#messages li')).toHaveCount(0);
});
