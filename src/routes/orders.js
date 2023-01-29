const express = require('express');
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const router = express.Router();

router.post('/place', middlewares.verifyAccessToken, controllers.orders.place);
router.post('/edit', middlewares.verifyAccessToken, controllers.orders.edit);
router.post('/state', middlewares.verifyAccessToken, controllers.orders.editState);
router.get('/', middlewares.verifyAccessToken, controllers.orders.orders);
router.get('/today', middlewares.verifyAccessToken, controllers.orders.ordersToday);
router.get('/:id', middlewares.verifyAccessToken, controllers.orders.order);

module.exports = router;