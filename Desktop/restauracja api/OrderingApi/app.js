

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

const dbName = 'restauracja';
const dbUser = 'krosnowsky';
const dbPass = 'Aneczka96';




app.use(bodyParser.json());
app.use(cors());

mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.pweqzdn.mongodb.net/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
})
.then(() => console.log('Połączono z bazą danych atlas'))
.catch((err) => console.error('Błąd połączenia z bazą danych:', err));

const dishSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
});
const Dish = mongoose.model('Dish', dishSchema, 'dania'); // Ustawienie nazwy kolekcji

app.get('/api/dishes', (req, res) => {
    Dish.find({})
        .then((dishes) => {
            res.json(dishes);
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

app.post('/api/dishes/order', (req, res) => {
    const { dishId, quantity } = req.body;
    res.json({ message: 'Zamówienie przyjęte' });
});

app.get('/api/dishes/:category', (req, res) => {
    const { category } = req.params;
    Dish.find({ category: category })
        .then((dishes) => {
            if (dishes.length === 0) {
                res.status(404).json({ message: 'Nie znaleziono dań w danej kategorii' });
            } else {
                res.json(dishes);
            }
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});



app.listen(PORT, () => {
    console.log(`Serwer wystartował na porcie: ${PORT}`);
});
