const express = require("express");
const router = express.Router();
router.use(express.json());
const mysql = require('mysql');
const userController = require('../controllers/user.js');

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

router.get('/1.0.0/', userController.login);
router.post('/1.0.0/create', userController.create);
router.put('/1.0.0/game_started', userController.gameStart);
router.put('/1.0.0/win', userController.win);
router.put('/1.0.0/loss', userController.loss);
router.put('/1.0.0/tie', userController.tie);

module.exports = router;