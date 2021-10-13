const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({extended: true}));
const {check , validationResult} = require('express-validator');
const passport = require('passport');
router.use(passport.initialize());
router.use(passport.session());
const userController = require('../controllers/user.js');

router.get('/1.0.0/:Username/:Password', userController.login);
router.post('/1.0.0/create',
        check('Username').notEmpty().withMessage('Must provide username'),
        check('Username').isLength({min: 4, max: 14}).withMessage('Username must be between 4 and 14 characters'),
        check('Password').notEmpty().withMessage('Must provide password'),
        check('Password').isLength({min: 4, max: 14}).withMessage('Password must be between 4 and 14 characters'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json({data: errors.array()});
            } else {
                return next();
            }
        });

router.post('/1.0.0/create', userController.create);
router.put('/1.0.0/game_started', userController.gameStart);
router.put('/1.0.0/win', userController.win);
router.put('/1.0.0/loss', userController.loss);
router.put('/1.0.0/tie', userController.tie);

module.exports = router;