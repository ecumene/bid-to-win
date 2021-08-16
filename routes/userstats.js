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

//Fetches user's stats to display//
router.get('/1.0.0/:Username', (req, res) => {
    let sql = 'SELECT * FROM leaderboard.user_stats WHERE Username=?';
    db.query(sql, req.query.Username, (err, rows) => {
        if(err) {throw err;
        } else {
        console.log('User stats retrieved.');
        res.json(rows);
        }
    });    
});

//Fetches user's rank in GP in database for display. Runs off of same function as /user/:Username//
router.get('/gprank/1.0.0/:Username', (req, res) => {
    let sql = 'SELECT * FROM leaderboard.gp_rank WHERE Username=?';
    db.query(sql, req.query.Username, (err, rows) => {
        if(err) {throw err;
        } else {
            res.json(rows);
        }        
    });    
});

//Fetches user's rank in Wins in database for display. Runs off of same function as /user/:Username//
router.get('/winsrank/1.0.0/:Username', (req, res) => {
    let sql = 'SELECT * FROM leaderboard.wins_rank WHERE Username=?';
    db.query(sql, req.query.Username, (err, rows) => {
        if(err) {throw err;
        } else {
        res.json(rows);
        }
    });    
});

//Fetches user's rank in Wins in database for display. Runs off of same function as /user/:Username//
router.get('/winperrank/1.0.0/:Username', (req, res) => {
    let sql = 'SELECT * FROM leaderboard.winperc_rank WHERE Username=?';
    db.query(sql, req.query.Username, (err, rows) => {
        if(err) {throw err;
        } else {
        res.json(rows);
        }
    });    
});

module.exports = router;