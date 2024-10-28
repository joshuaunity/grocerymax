const mongoose = require('mongoose');

const GrocerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },

},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Grocery', GrocerySchema);