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

// Bid-to-win
// This collection contains PUT and POST requests from a locally hosted strategy game.

// It contains the following requests

// Create new user
// Game started stats update
// User won stats update
// User lost stats update
// User tied stats update

router.get('/1.0.0/', userController.login);
router.post('/1.0.0/create', userController.create);
router.put('/1.0.0/game_started', userController.gameStart);
router.put('/1.0.0/win', userController.win);
router.put('/1.0.0/loss', userController.loss);
router.put('/1.0.0/tie', userController.tie);
console.log("routers");

module.exports = router;