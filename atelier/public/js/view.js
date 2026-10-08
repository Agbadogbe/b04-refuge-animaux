export function renderMessages(messages, container) {
  const items = messages.map(({ role, text }) => {
    const item = document.createElement('li');
    const author = role === 'user' ? 'Vous' : 'Cap Web';
    item.textContent = `${author} : ${text}`;
    return item;
  });

  container.replaceChildren(...items);
}
