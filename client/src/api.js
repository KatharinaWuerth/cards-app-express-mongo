export function getCards() {
  return fetchCards({})
}

export function getCard(id) {
  return fetchCards({ id })
}

export function postCard(data) {
  return fetchCards({ method: 'POST', data })
}

export function deleteCard(id) {
  return fetchCards({ method: 'DELETE', id })
}

function fetchCards({ method = 'GET', data, id }) {
  const path = id ? `/cards/${id}` : '/cards'

  return fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json())
}
