import { it } from 'node:test';
import assert from 'node:assert/strict';
import { synonyme } from '../public/js/brain.js';

it('C1 : transforme les salutations en salut', () => {
  for (const message of ['coucou', 'hello', 'bonsoir']) {
    assert.equal(synonyme(message), 'salut');
  }
});

it('C2 : transforme les demandes de secours en aide', () => {
  assert.equal(synonyme('help'), 'aide');
  assert.equal(synonyme('sos'), 'aide');
});

it('C3 : ignore la casse et les espaces autour', () => {
  assert.equal(synonyme('  HELLO '), 'salut');
});

it('C4 : normalise un autre message', () => {
  assert.equal(synonyme('  Météo '), 'météo');
});

it('C5 : renvoie une chaîne vide pour une valeur qui n’est pas du texte', () => {
  for (const message of [undefined, null, 42]) {
    assert.equal(synonyme(message), '');
  }
});
