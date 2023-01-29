const {errorHandler, withTransaction} = require("../util");
const models = require("../models");
const {HttpError} = require("../error");
const {startOfDay, endOfDay} = require("date-fns");

const place = errorHandler(withTransaction(async (req, res, session) => {
    const tempList = req.body.product_list.map(product => {
        return {
            name: product.name,
            img: product.img,
            sku: product.sku,
            quantity: product.quantity,
            quantity_type: product.quantity_type
        }
    });
    const orderDoc = models.Order({
        placed_by: req.body.placed_by,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        pickup_date: req.body.pickup_date,
        pickup_time: req.body.pickup_time,
        delivery_date: req.body.delivery_date,
        other_info: req.body.other_info,
        state: "pending",
        product_list: tempList
    })
    await orderDoc.save({session});
    return orderDoc;
}));

const edit = errorHandler(withTransaction(async (req, res, session) => {
    const tempList = req.body.product_list.map(product => {
        return {
            name: product.name,
            img: product.img,
            sku: product.sku,
            quantity: product.quantity,
            quantity_type: product.quantity_type
        }
    });

    const orderDoc = await models.Order.findById(req.body.order_id).exec();

    orderDoc.firstname = req.body.firstname
    orderDoc.lastname = req.body.lastname
    orderDoc.phonenumber = req.body.phonenumber
    orderDoc.pickup_date = req.body.pickup_date
    orderDoc.pickup_time = req.body.pickup_time
    orderDoc.delivery_date = req.body.delivery_date
    orderDoc.other_info = req.body.other_info
    orderDoc.product_list = tempList

    await orderDoc.save({session});
    return orderDoc;
}));


const editState = errorHandler(withTransaction(async (req, res, session) => {

    const orderDoc = await models.Order.findById(req.body.order_id).exec();

    orderDoc.state = req.body.state

    await orderDoc.save({session});
    return orderDoc;
}));

const orders = errorHandler(async (req, res) => {
    return await models.Order.find().sort({pickup_date: 'desc'}).exec();
});

const ordersToday = errorHandler(async (req, res) => {
    const today = new Date();
    return await models.Order.find(
        { pickup_date: {
            $gte: startOfDay(today),
            $lt: endOfDay(today)
        },
        state: {
            $eq: "pending"
        }
        }).exec();
});

const order = errorHandler(async (req, res) => {
    const orderDoc = await models.Order.findById(req.params.id).exec();
    if (!orderDoc) {
        throw new HttpError(400, 'Order not found');
    }
    return orderDoc;
});

module.exports = {
    place,
    edit,
    editState,
    orders,
    ordersToday,
    order
};