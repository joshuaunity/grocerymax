const express = require('express');
const connectDB = require('./db');
const Grocery = require('./models/Grocery');

connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'API is running...' });
});

app.get('/groceries', async (req, res) => {
    const groceries = await Grocery.find();
    res.json(groceries);
});

app.post('/groceries', async (req, res) => {
    try {
        const { name, quantity, price, color } = req.body;

        if (!name || !quantity || !price) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const grocery = await Grocery.create({ name, quantity, price, color });
        res.json(grocery);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' });
    }
});

app.delete('/groceries/:id', async (req, res) => {
    try {
        const grocery = await Grocery.findById(req.params.id);

        if (!grocery) {
            return res.status(404).json({ message: 'Grocery not found' });
        }

        await grocery.deleteOne();
        res.json({ message: 'Grocery removed' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' });
    }
});

app.listen(8800, () => {
    console.log('Server is running on port 8800');
});
