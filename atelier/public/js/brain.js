export const MESSAGE_LIMIT = 320;

export function validateMessage(raw) {
  if (typeof raw !== 'string') {
    return { ok: false, error: 'Le message doit être du texte.' };
  }

  const value = raw.trim();

  if (value.length === 0) {
    return { ok: false, error: 'Écrivez un message avant de l’envoyer.' };
  }

  if (value.length > MESSAGE_LIMIT) {
    return {
      ok: false,
      error: `Le message ne doit pas dépasser ${MESSAGE_LIMIT} caractères.`,
    };
  }

  return { ok: true, value };
}

export function replyTo(message) {
  const normalized = typeof message === 'string' ? message.trim().toLocaleLowerCase('fr') : '';

  const replies = {
    salut: 'Bonjour ! Comment puis-je vous aider au sujet du refuge ?',
    bonjour: 'Bonjour ! Comment puis-je vous aider au sujet du refuge ?',
    aide: 'Je reconnais les mots salut, bonjour, aide, test, plage et fenêtre.',
    test: 'Le cerveau de Cap Web fonctionne.',
    plage: 'Le mot « plage » est bien reconnu.',
    fenêtre: 'Le mot « fenêtre » est bien reconnu.',
  };

  return replies[normalized] ?? 'Je ne connais pas encore cette demande. Essayez « aide ».';
}
