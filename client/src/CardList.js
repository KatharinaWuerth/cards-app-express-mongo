import { Card } from './Card'

export class CardList {
  constructor({ onDelete, cards }) {
    this.onDelete = onDelete
    this.el = this.render()
    this.update(cards)
  }

  render() {
    const el = document.createElement('ul')
    document.body.appendChild(el)
    return el
  }

  update(cards) {
    this.el.innerHTML = ''
    cards.forEach(
      card => new Card({ card, onDelete: this.onDelete, target: this.el })
    )
  }
}
