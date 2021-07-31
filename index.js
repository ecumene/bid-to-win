const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT+'Step One');
});

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

app.get('/testdb', (req, res) => {
    let sql = 'CREATE DATABASE testdb';
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.put('/create_user', (req, res) => {
    let sql = 'INSERT INTO leaderboard.user_stats (Username, GP, Wins, Losses, Ties, Abandons)' +
                'VALUES (?, 0, 0, 0, 0, 0)';
    db.query(sql, [req.body.Username, req.body.GP, req.body.Wins, req.body.Losses, req.body.Ties, req.body.Abandons], (err, result) => {
        if(err) throw err;
        console.log("New user created");
        res.send(result);
    });
});

app.delete('/delete_user', (req, res) => {
    let sql = 'DELETE FROM leaderboard.user_stats WHERE ID=?'
    db.query (sql, req.body.ID, (err, result) => {
        if(err) throw err;
        console.log('Deleted user');
        res.send(result);
    });
});

app.put('/game_started', (req, res) => {
    let sql = 'UPDATE leaderboard.user_stats SET GP=GP+1, Abandons=Abandons+1 WHERE ID=?';
    db.query(sql, req.body.ID, (err, result) => {
        if(err) throw err;
        console.log("Game started");
        res.send(result);
    });
});

app.put('/user_win', (req, res) => {
    let sql = 'UPDATE leaderboard.user_stats SET Wins=Wins+1, Abandons=Abandons-1 WHERE ID=?';
    db.query(sql, req.body.ID, (err, result) => {
        if(err) throw err;
        console.log("User won");
        res.send(result);
    });
});

app.put('/user_loss', (req, res) => {
    let sql = 'UPDATE leaderboard.user_stats SET Losses=Losses+1, Abandons=Abandons-1 WHERE ID=?';
    db.query(sql, req.body.ID, (err, result) => {
        if(err) throw err;
        console.log("User lost");
        res.send(result);
    });
});

app.put('/user_tie', (req, res) => {
    let sql = 'UPDATE leaderboard.user_stats SET Ties=Ties+1, Abandons=Abandons-1 WHERE ID=?';
    db.query(sql, req.body.ID, (err, result) => {
        if(err) throw err;
        console.log("User tied");
        res.send(result);
    });
});