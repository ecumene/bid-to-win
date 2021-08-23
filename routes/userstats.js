const express = require("express");
const router = express.Router();
router.use(express.json());
const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//Fetches user's rank in GP in database for display. Runs off of same function as /user/:Username//
router.get('/1.0.0/gprank/:Username', (req, res) => {
    let sql = 'SELECT * FROM gp_rank WHERE Username=?';
    db.query(sql, req.query.Username, (err, rows) => {
        if(err) {throw err;
        } else {
            res.json(rows);
        }        
    });    
});

//Fetches user's rank in Wins in database for display. Runs off of same function as /user/:Username//
router.get('/1.0.0/winsrank/:Username', (req, res) => {
    let sql = 'SELECT * FROM wins_rank WHERE Username=?';
    db.query(sql, req.query.Username, (err, rows) => {
        if(err) {throw err;
        } else {
        res.json(rows);
        }
    });    
});

//Fetches user's rank in Wins in database for display. Runs off of same function as /user/:Username//
router.get('/1.0.0/winperrank/:Username', (req, res) => {
    let sql = 'SELECT * FROM winperc_rank WHERE Username=?';
    db.query(sql, req.query.Username, (err, rows) => {
        if(err) {throw err;
        } else {
        res.json(rows);
        }
    });    
});

module.exports = router;