import { replyTo, validateMessage } from './brain.js';
import { renderMessages } from './view.js';

const STORAGE_KEY = 'capweb.historique';
const form = document.querySelector('#chat-form');
const message = document.querySelector('#message');
const messages = document.querySelector('#messages');
const status = document.querySelector('#status');
const clearButton = document.querySelector('#effacer');
const suggestionButtons = document.querySelectorAll('#suggestions button');
let historique = [];

try {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored !== null) {
    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) {
      throw new TypeError('Historique invalide');
    }

    historique = parsed.filter((entry) => (
      entry
      && (entry.role === 'user' || entry.role === 'assistant')
      && typeof entry.text === 'string'
    )).map(({ role, text }) => ({ role, text }));
  }
} catch {
  historique = [];
  localStorage.removeItem(STORAGE_KEY);
  status.textContent = 'La mémoire était illisible : la conversation repart vide.';
}

renderMessages(historique, messages);

function saveHistory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(historique));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const validation = validateMessage(message.value);

  if (!validation.ok) {
    status.textContent = validation.error;
    message.focus();
    return;
  }

  historique.push(
    { role: 'user', text: validation.value },
    { role: 'assistant', text: replyTo(validation.value) },
  );
  saveHistory();
  renderMessages(historique, messages);
  message.value = '';
  status.textContent = '';
  message.focus();
});

suggestionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    message.value = button.textContent;
    message.focus();
    status.textContent = 'Question copiée : modifiez-la ou envoyez-la.';
  });
});

clearButton.addEventListener('click', () => {
  if (!confirm('Effacer toute la conversation ?')) {
    return;
  }

  historique = [];
  localStorage.removeItem(STORAGE_KEY);
  renderMessages(historique, messages);
  status.textContent = 'Conversation effacée.';
  message.focus();
});
