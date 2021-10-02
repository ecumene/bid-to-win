let errObj = [];
const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));
const mysql = require('mysql');
const {check , validationResult} = require('express-validator');
const passport = require('passport');
router.use(passport.initialize());
router.use(passport.session());
const userController = require('../controllers/user.js');

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// router.get('1.0.0/:Username/:Password',
//         check('Username').isLength({min: 4, max: 14}).withMessage('Username must be between 4 and 14 characters'),
//         check('Password').isLength({min: 4, max: 14}).withMessage('Password must be between 4 and 14 characters'),
//         (req, res, next) => {
//             const errors = req.validationErrors();
//             if (errors){
//                 console.log('got here');
//                 req.flash('error', errors); //this is where the flash redirect has to go
//                 console.log(errors);                
//                 return res.status(400).json({errors: errors.array()});
//             } else {
//                 next();
//             }
//         });

router.get('/1.0.0/:Username/:Password', userController.login);
router.post('/1.0.0/create',
        check('Username').notEmpty().withMessage('Must provide username'),
        check('Username').isLength({min: 4, max: 14}).withMessage('Username must be between 4 and 14 characters'),
        check('Password').notEmpty().withMessage('Must provide password'),
        check('Password').isLength({min: 4, max: 14}).withMessage('Password must be between 4 and 14 characters'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                //document.getElementById('rulespar').innerHTML += errObj.msg+'<br><br>';
                //req.flash('error_msg', errors); //this is where the flash redirect has to go
                errObj = errors[0];
                console.log(errObj);
            } else {
                console.log('No errors')
                return next();
            }
        });

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