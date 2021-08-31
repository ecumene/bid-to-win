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

const login = (req, res, next) => {
    let sql = 'SELECT * FROM user_stats WHERE Username=? AND Password=?';
    db.query(sql, [req.query.Username, req.query.Password], (err, rows) => {
        if(err) {throw err;
        } else {    
        res.status(200).json({Success: true});
        }
    });
};

const create = (req, res, next) => {
    let sql = 'INSERT INTO user_stats (Username, GP, Wins, Losses, Ties, Abandons, WinPerc, Password)' +
        'VALUES (?, 0, 0, 0, 0, 0, 0, ?)';
    db.query(sql, [req.body.Username, req.body.Password], (err, res) => {
        if(err) {
            console.log(err);
        } else {
            res.status(200).json({Success: true, res: create});
        }
    });
}

const gameStart = (req, res, next) => {
    let sql = 'UPDATE user_stats SET GP=GP+1, Abandons=Abandons+1 WHERE Username=?';
    db.query(sql, req.body.Username, (err, result) => {
        if(err) {throw err;
        } else {
        res.status(200).json({Success: true});
        }
    });
}

const win = (req, res, next) => {
    let sql = 'UPDATE user_stats SET Wins=Wins+1, Abandons=Abandons-1, WinPerc=? WHERE Username=?';
    db.query(sql, [req.body.WinPerc, req.body.Username], (err, result) => {
        if(err) {throw err;
        } else {
        res.status(200).json({Success: true});
        }
    });   
}

const loss = (req, res, next) => {
    let sql = 'UPDATE user_stats SET Losses=Losses+1, Abandons=Abandons-1, WinPerc=? WHERE Username=?';
    db.query(sql, [req.body.WinPerc, req.body.Username], (err, result) => {
        if(err) {throw err;
        } else {
            res.status(200).json({Success: true});
        }
    });
}

const tie = (req, res, next) => {
    let sql = 'UPDATE user_stats SET Ties=Ties+1, Abandons=Abandons-1, WinPerc=? WHERE Username=?';
    db.query(sql, [req.body.WinPerc, req.body.Username], (err, result) => {
        if(err) {throw err;
        } else {
            res.status(200).json({Success: true});
        }
    });
}

module.exports = {login, create, gameStart, win, loss, tie};

// exports.login = (req, res, next) => {
//     const dbresults = () => {
//             let sql = 'SELECT * FROM leaderboard.user_stats WHERE Username=? AND Password=?';
//         db.query(sql, [req.query.Username, req.query.Password], (err, rows) => {
//             if(err) {throw err;
//             } else {    
//             console.log('User is logged in.');
//             res.json(rows);
//             }
//         });
//     }

//     res.status(200).json({Success: true, data: dbresults});
//     console.log(data);
// }