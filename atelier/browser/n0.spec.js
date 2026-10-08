import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test, expect } from '@playwright/test';

const ici = path.dirname(fileURLToPath(import.meta.url));
const essais = path.join(ici, '..', '..', 'essais-n0');

async function load(page, filename) {
  await page.goto('/');
  const html = await readFile(path.join(essais, filename), 'utf8');
  await page.setContent(html);
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => globalThis.localStorage.clear());
});

test('chatbot-v1 répond sur le thème et laisse le navigateur refuser le vide', async ({ page }) => {
  await load(page, 'chatbot-v1.html');
  await page.locator('#message').fill('Comment adopter un animal ?');
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.locator('#messages')).toContainText('Pour adopter');

  await page.locator('#message').fill('Quand peut-on visiter le refuge ?');
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.locator('#messages')).toContainText('Les horaires varient selon le refuge.');

  await page.locator('#message').fill('Quelle est la capitale de la France ?');
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.locator('#messages')).toContainText('Je peux vous renseigner');

  await page.getByRole('button', { name: 'Envoyer' }).click();
  expect(await page.locator('#message').evaluate(element => element.checkValidity())).toBe(false);
  await expect(page.getByRole('status')).toHaveText('');
});

test('chatbot-v2 efface aussi le message d’accueil', async ({ page }) => {
  await load(page, 'chatbot-v2.html');
  await expect(page.locator('#messages li')).toHaveCount(1);
  await page.getByRole('button', { name: 'Effacer' }).click();
  await expect(page.locator('#messages li')).toHaveCount(0);
});

test('chatbot-v3 garde la conversation mais casse sur un JSON invalide', async ({ page }) => {
  await load(page, 'chatbot-v3.html');
  await page.locator('#message').fill('adoption');
  await page.getByRole('button', { name: 'Envoyer' }).click();
  await expect(page.locator('#messages li')).toHaveCount(2);

  await load(page, 'chatbot-v3.html');
  await expect(page.locator('#messages li')).toHaveCount(2);

  await page.evaluate(() => globalThis.localStorage.setItem('refuge.chat.v3', '{pas du json'));
  const errors = [];
  page.once('pageerror', error => errors.push(error.message));
  await load(page, 'chatbot-v3.html');
  expect(errors).toHaveLength(1);
});

test('chatbot-v4 résiste au JSON invalide et copie une suggestion', async ({ page }) => {
  await page.evaluate(() => globalThis.localStorage.setItem('refuge.chat.v4', '{pas du json'));
  await load(page, 'chatbot-v4.html');
  await page.getByRole('button', { name: 'Comment adopter un animal au refuge ?' }).click();
  await expect(page.locator('#message')).toHaveValue('Comment adopter un animal au refuge ?');
  await expect(page.locator('#messages li')).toHaveCount(0);
});

for (const filename of ['essai-A.html', 'essai-B.html', 'essai-C.html']) {
  test(`${filename} répond à une question sur l’adoption`, async ({ page }) => {
    await load(page, filename);
    const field = page.locator('#question');
    await field.fill('Comment adopter un animal ?');
    await page.getByRole('button', { name: 'Envoyer' }).click();
    await expect(page.locator('body')).toContainText('Vous : Comment adopter un animal ?');
  });
}
