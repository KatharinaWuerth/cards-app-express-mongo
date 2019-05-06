export class Card {
  constructor({ card, target, onDelete }) {
    this.card = card
    const el = this.render(card, target)
    this.addDeleteHandler(el, onDelete)
  }

  render(card, target) {
    const el = document.createElement('li')
    el.innerHTML = `
      <strong>${card.title} (${
      card.description
    })</strong> <span class="delete">&cross;</span>
    `
    target.appendChild(el)
    return el
  }

  addDeleteHandler(el, onDelete) {
    const deleteEl = el.querySelector('.delete')
    deleteEl.addEventListener('click', () => onDelete(this.card))
  }
}
