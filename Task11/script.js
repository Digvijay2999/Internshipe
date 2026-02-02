document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('cardGrid');
  const btn = document.querySelector('.add-card');
  if (!grid || !btn) return;

  let uid = Date.now();
  const choose = (prob) => Math.random() < prob;

  function createCard() {
    const card = document.createElement('div');
    card.className = 'card new';

    const isWide = choose(0.25);
    const isTall = choose(0.25);
    if (isWide) card.classList.add('wide');
    if (isTall) card.classList.add('tall');

    uid += 1;
    const content = document.createElement('div');
    content.innerHTML = `<div class="value">New ${uid}</div><div class="meta">${isWide ? 'wide' : ''} ${isTall ? 'tall' : ''}</div>`;
    card.appendChild(content);

    // Insert at the top so new content is immediately visible; grid handles placement
    grid.insertBefore(card, grid.firstChild);

    // Remove helper class after animation so it can re-play later
    setTimeout(() => card.classList.remove('new'), 700);

    // Ensure visible on small screens
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  btn.addEventListener('click', createCard);
});