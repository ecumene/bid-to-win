const express = require("express");
const router = express.Router();
router.use(express.json());
const mysql = require('mysql');
const {check , validationResult} = require('express-validator');
const userController = require('../controllers/user.js');

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});



router.get('/1.0.0/:Username/:Password', userController.login);
// router.post('/1.0.0/create',
//         check('Username').isLength({min: 4, max: 14}),
//         check('Password').isLength({min: 4, max: 14}),
//         (req, res) => {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()){
//                 return res.status(400).json({errors: errors.array()});
//             }
//         },
//         userController.create);

router.post('/1.0.0/create', userController.create);
router.put('/1.0.0/game_started', userController.gameStart);
router.put('/1.0.0/win', userController.win);
router.put('/1.0.0/loss', userController.loss);
router.put('/1.0.0/tie', userController.tie);

module.exports = router;

// [
//     check('req.query.Username', 'Username must contain between 4 and 14 characters').isLength({
//         min: 4,
//         max: 14
//     }),
//     check('req.query.Password', 'Password must contain between 4 and 14 characters').isLength({
//         min: 4,
//         max: 14
//     })
// ]