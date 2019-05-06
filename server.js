const express = require('express');
const mongoose = require('mongoose');
const Card = require('./models/Card');

mongoose
  .connect('mongodb://localhost:27017/cards-app-express-mongo', {
    useNewUrlParser: true
  })
  .then(() => console.log('Connecetd to mongodb'))
  .catch(err => console.error(err));

const app = express();
app.use(express.json());
app.use(express.static('./dist')); //Client Daten sind da drin

// könnte in den () von find schreiben ({category: 'foo'}) --> gibt nun nur die Cards zurück, die diese category haben
//Card.find({ order: { $gt: 3 } }) //könnte auch order : 3 schreiben, dann würde ich nur die Cards mit 3 bekommen
app.get('/cards', (req, res) => {
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => res.json({ errors: [err] }));
});

app.get('/cards/:id', (req, res) => {
  const { id } = req.params;
  Card.findById(id)
    .then(card => res.json(card))
    .catch(err => res.json({ errors: [err] })); // ist das gleiche wie: .catch(err => res.json(err))
});

app.delete('/cards/:id', (req, res) => {
  const { id } = req.params;
  Card.findByIdAndDelete(id)
    .then(data => res.json(data))
    .catch(err => res.json({ errors: [err] }));
});

// Einträge ändern
app.patch('/cards/:id', (req, res) => {
  const { id } = req.params;
  Card.findByIdAndUpdate(id, req.body, { new: true }) //das neue Element soll zurück gegeben werden
    .then(data => res.json(data))
    .catch(err => res.json({ errors: [err] }));
});

app.post('/cards', (req, res) => {
  Card.create(req.body) //erzeugt eine Instanz und speichert sie
    .then(card => res.status(201).json(card))
    .catch(err => res.status(500).json(err));

  // Version ohne mongoDB
  //const card = { ...req.body, id: uid() };
  //cards.push(card);
  //saveCards(err => res.json(err || card));
});

app.listen(3000, err => {
  err ? console.log(err) : console.log('Server ready');
});

/* brauchen wir nicht mehr, da wir jetzt nicht mehr in einer file speichern, sondern in der DB
function saveCards(callback) {
  fs.writeFile(__dirname + '/cards.json', JSON.stringify(cards), err => {
    callback(err);
  });
}

function loadCards() {
  fs.readFile(__dirname + '/cards.json', 'utf8', (err, data) => {
    if (!err) {
      try {
        cards = JSON.parse(data);
      } catch (err) {
        throw err;
      }
    }
  });
}
*/
