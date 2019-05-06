export class Form {
  el = this.render()

  constructor({ onSubmit }) {
    this.onSubmit = onSubmit
    this.el.addEventListener('submit', this.sendForm)
  }

  sendForm = event => {
    event.preventDefault()
    const { title: titleEl, description: descriptionEl } = event.target
    this.onSubmit(titleEl.value, descriptionEl.value)
    this.el.reset()
    titleEl.focus()
  }

  render() {
    const el = document.createElement('form')
    el.innerHTML = `
      <input name="title" placeholder="title" type="text">
      <input name="description" placeholder="description" type="text">
      <button>Create card</button>
    `
    document.body.appendChild(el)
    return el
  }
}
