const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use(express.json());

app.use(express.static('./'));

app.listen(process.env.PORT, () => {
    console.log("Listening on Port "+ process.env.PORT);
});

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

//Fetches user object from database. To run on login.//
app.get('/user/:Username/:Password', (req, res) => {
    console.log(req.query.Username);
    console.log(req.query.Password);
    console.log(req.query);
    let sql = 'SELECT * FROM leaderboard.user_stats WHERE Username=? AND Password=?';
    db.query(sql, [req.query.Username, req.query.Password], (err, rows) => {
        if(err) throw err;
        console.log('Attempted to retrieve User Data');
        res.json(rows);
    });    
});

//Adds new user to database//
app.post('/create_user', (req, res) => {
    let sql = 'INSERT INTO leaderboard.user_stats (Username, GP, Wins, Losses, Ties, Abandons, Password)' +
                'VALUES (?, 0, 0, 0, 0, 0, ?)';
    db.query(sql, [req.body.Username, req.body.Password], (err, result) => {
        if(err) throw err;
        console.log(`New user created: ${req.body.Username}`);
        res.send(result);
    });
});

//Removes user from database. May not implement?//
app.delete('/delete_user', (req, res) => {
    let sql = 'DELETE FROM leaderboard.user_stats WHERE ID=?'
    db.query (sql, req.body.ID, (err, result) => {
        if(err) throw err;
        console.log('Deleted user');
        res.send(result);
    });
});

//Increases user's GP and Abandons by 1. To run at start of game.//
app.put('/game_started', (req, res) => {
    let sql = 'UPDATE leaderboard.user_stats SET GP=GP+1, Abandons=Abandons+1 WHERE ID=?';
    db.query(sql, req.body.ID, (err, result) => {
        if(err) throw err;
        console.log("Game started");
        res.send(result);
    });
});

//Increases users Wins by 1 and decreases Abandons by 1. To run after win//
app.put('/user_win', (req, res) => {
    let sql = 'UPDATE leaderboard.user_stats SET Wins=Wins+1, Abandons=Abandons-1 WHERE ID=?';
    db.query(sql, req.body.ID, (err, result) => {
        if(err) throw err;
        console.log("User won");
        res.send(result);
    });
});

//Increases users Losses by 1 and decreases Abandons by 1. To run after loss//
app.put('/user_loss', (req, res) => {
    let sql = 'UPDATE leaderboard.user_stats SET Losses=Losses+1, Abandons=Abandons-1 WHERE ID=?';
    db.query(sql, req.body.ID, (err, result) => {
        if(err) throw err;
        console.log("User lost");
        res.send(result);
    });
});

//Increases users Ties by 1 and decreases Abandons by 1. To run after tie//
app.put('/user_tie', (req, res) => {
    let sql = 'UPDATE leaderboard.user_stats SET Ties=Ties+1, Abandons=Abandons-1 WHERE ID=?';
    db.query(sql, req.body.ID, (err, result) => {
        if(err) throw err;
        console.log("User tied");
        res.send(result);
    });
});