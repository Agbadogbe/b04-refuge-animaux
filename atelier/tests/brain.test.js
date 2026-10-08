import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateMessage, replyTo } from '../public/js/brain.js';

describe('validateMessage', () => {
  it('refuse une chaîne vide', () => {
    assert.equal(validateMessage('   ').ok, false);
  });

  it('nettoie les espaces autour du message', () => {
    assert.deepEqual(validateMessage('  salut  '), { ok: true, value: 'salut' });
  });

  it('accepte 320 caractères et refuse 321 caractères', () => {
    assert.equal(validateMessage('a'.repeat(320)).ok, true);
    assert.equal(validateMessage('a'.repeat(321)).ok, false);
  });
});

describe('replyTo', () => {
  it('répond de la même façon à SALUT et salut', () => {
    assert.equal(replyTo('SALUT'), replyTo('salut'));
  });

  it('reconnaît le mot personnel plage', () => {
    assert.notEqual(replyTo('plage'), replyTo('une phrase inconnue'));
  });

  it('reconnaît le mot personnel fenêtre sans tenir compte de la casse', () => {
    assert.equal(replyTo('FENÊTRE'), replyTo('fenêtre'));
    assert.notEqual(replyTo('fenêtre'), replyTo('une phrase inconnue'));
  });

  it('ne confond pas test et tester', () => {
    assert.notEqual(replyTo('test'), replyTo('tester'));
  });
});
