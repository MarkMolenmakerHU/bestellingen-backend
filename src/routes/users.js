const express = require('express');
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const router = express.Router();

router.get('/me', middlewares.verifyAccessToken, controllers.users.me);
router.get('/', middlewares.verifyAccessToken, controllers.users.users);
router.get('/:id', middlewares.verifyAccessToken, controllers.users.user);

module.exports = router;