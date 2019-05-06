import { postCard, getCards, deleteCard } from './api'
import { Form } from './Form'
import { CardList } from './CardList'

export class App {
  cards = []

  constructor() {
    this.form = new Form({
      onSubmit: this.createCard,
    })

    this.list = new CardList({
      onDelete: this.deleteCard,
      cards: this.cards,
    })
    this.loadCards()
  }

  loadCards() {
    getCards()
      .then(this.updateCards)
      .catch(err => console.log(err))
  }

  updateCards = cards => {
    this.cards = cards
    this.list.update(cards)
  }

  createCard = (title, description) => {
    postCard({ title, description })
      .then(card => {
        this.updateCards([...this.cards, card])
      })
      .catch(err => console.log(err))
  }

  deleteCard = card => {
    deleteCard(card.id).then(data => {
      if (!data.error) {
        this.updateCards(data)
      }
    })
  }
}
