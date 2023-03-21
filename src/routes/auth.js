const express = require('express');
const controllers = require("../controllers");
const middlewares = require("../middlewares");
const router = express.Router();

router.post('/signup', controllers.auth.signup);
router.post('/login', controllers.auth.login);
router.post('/logout', controllers.auth.logout);
router.post('/logoutAll', controllers.auth.logoutAll);
router.post('/accessToken', controllers.auth.newAccessToken);
router.post('/refreshToken', controllers.auth.newRefreshToken);
router.get('/validate', middlewares.verifyAccessToken, (req, res) =>{ res.send({validAccessToken: true})});
router.get('/validate/refreshToken', middlewares.verifyRefreshToken, (req, res) =>{ res.send({validRefreshToken: true})});

module.exports = router;