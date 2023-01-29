const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const ordersRouter = require('./orders');

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/orders', ordersRouter);

module.exports = router;