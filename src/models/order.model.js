const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const orderSchema = new Schema({
    placed_by: {type: String, unique: false},
    firstname: {type: String, unique: false},
    lastname: {type: String, unique: false},
    phonenumber: {type: String, unique: false},
    pickup_date: {type: Date, unique: false},
    pickup_time: {type: String, unique: false},
    delivery_date: {type: Date, unique: false},
    other_info: {type: String, unique: false},
    state: {type: String, unique: false},
    product_list: [{
        name: {type: String, unique: false},
        img: {type: String, unique: false},
        sku: {type: String, unique: false},
        quantity: {type: Number, unique: false},
        quantity_type: {type: String, unique: false},
    }]
});

const Order = model('Order', orderSchema);

module.exports = Order;