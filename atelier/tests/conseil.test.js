import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from '../server/app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

let serveur;
let baseUrl;

before(async () => {
  const app = createApp({ publicDir, version: 'test-conseil' });
  await new Promise((resolve) => {
    serveur = app.listen(0, '127.0.0.1', resolve);
  });
  const adresse = serveur.address();
  baseUrl = `http://127.0.0.1:${adresse.port}`;
});

after(() => new Promise((resolve) => serveur.close(resolve)));

test('GET /api/conseil renvoie un conseil en JSON', async () => {
  const reponse = await fetch(`${baseUrl}/api/conseil`);
  assert.equal(reponse.status, 200);
  assert.match(reponse.headers.get('content-type') ?? '', /application\/json/);
  const donnees = await reponse.json();
  assert.equal(typeof donnees.conseil, 'string');
  assert.ok(donnees.conseil.trim().length > 0);
});
