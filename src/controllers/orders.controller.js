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
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phonenumber: req.body.phonenumber,
        pickup_date: req.body.pickup_date,
        pickup_time: req.body.pickup_time,
        delivery_date: req.body.delivery_date,
        other_info: req.body.other_info,
        state: "pending",
        product_list: tempList,
        activity_log: [{
            user: req.body.placed_by,
            date: new Date(),
            actions: ["Bestelling aangemaakt"]
        }]
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

    const edits = [];
    if (orderDoc.firstname !== req.body.firstname)
        edits.push(`Voornaam gewijzigd van ${orderDoc.firstname} naar ${req.body.firstname}`);
    orderDoc.firstname = req.body.firstname

    if (orderDoc.lastname !== req.body.lastname)
        edits.push(`Achternaam gewijzigd van ${orderDoc.lastname} naar ${req.body.lastname}`);
    orderDoc.lastname = req.body.lastname

    if (orderDoc.phonenumber !== req.body.phonenumber)
        edits.push(`Telefoonnummer gewijzigd van ${orderDoc.phonenumber} naar ${req.body.phonenumber}`);
    orderDoc.phonenumber = req.body.phonenumber

    if (orderDoc.pickup_date !== req.body.pickup_date)
        edits.push(`Ophaaldatum gewijzigd van ${stringDate(orderDoc.pickup_date)} naar ${stringDate(req.body.pickup_date)}`);
    orderDoc.pickup_date = req.body.pickup_date

    if (orderDoc.pickup_time !== req.body.pickup_time)
        edits.push(`Ophaaltijd gewijzigd van ${orderDoc.pickup_time} naar ${req.body.pickup_time}`);
    orderDoc.pickup_time = req.body.pickup_time

    if (orderDoc.delivery_date !== req.body.delivery_date)
        edits.push(`Leverdatum gewijzigd van ${stringDate(orderDoc.delivery_date)} naar ${stringDate(req.body.delivery_date)}`);
    orderDoc.delivery_date = req.body.delivery_date

    if (orderDoc.other_info !== req.body.other_info)
        edits.push(`Opmerkingen gewijzigd van ${orderDoc.other_info} naar ${req.body.other_info}`);
    orderDoc.other_info = req.body.other_info

    if (orderDoc.product_list !== tempList)
        edits.push(`Producten gewijzigd`);
    orderDoc.product_list = tempList

    orderDoc.activity_log.push({
        user: req.body.edited_by,
        date: new Date(),
        actions: edits
    });

    await orderDoc.save({session});
    return orderDoc;
}));


const editState = errorHandler(withTransaction(async (req, res, session) => {

    const orderDoc = await models.Order.findById(req.body.order_id).exec();

    orderDoc.state = req.body.state
    orderDoc.activity_log.push({
        user: req.body.edited_by,
        date: new Date(),
        actions: [`Status gewijzigd naar ${req.body.state}`]
    });

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

function stringDate(date) {
    date = new Date(date);
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
}

module.exports = {
    place,
    edit,
    editState,
    orders,
    ordersToday,
    order
};