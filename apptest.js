const express = require('express');

const app = express();
const router = express.Router();
router.use(express.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const user = require('./routes/user.js');
app.use('/user', user);

module.exports = app;