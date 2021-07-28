const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.listen('3000', () => {
    console.log("Step One");
});

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '!Rangers1!',
    database: 'leaderboard'
});

app.get('/testdb', (req, res) => {
    let sql = 'CREATE DATABASE testdb';
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send("made database");
    });
});

app.put('/user', (req, res) => {
    let sql = "INSERT INTO leaderboard.user_stats (Username, GP, Wins, Losses, Ties, Abandons)" +
                "VALUES ('Test-User', '0', '0', '0', '0', '0')";
    db.query(sql, req.body, (err, result) => {
        if(err) throw err;
        console.log("working");
        res.send('Successfully added new user to database.');
    });
});

app.put('/statchange', (req, res) => {
    let sql = "UPDATE leaderboard.user_stats " +
              "SET GP='3', Wins='2', Losses='1', Ties='0', Abandons='0' " +
              "WHERE ID='2'";
    db.query(sql, req.body, (err, result) => {
        if(err) throw err;
        console.log("working");
        res.send('Successfully gave playerID2 a GP and win.');
    });
});

app.put('/statchange2', (req, res) => {
    let sql = "UPDATE leaderboard.user_stats " +
              "SET GP='"+p1GP+"', Wins='"+p1W+"', Losses='"+p1L+"', Ties='"+piT+"', Abandons='"+p1A+"' " +
              "WHERE ID='"+p1ID+"'";
    db.query(sql, req.body, (err, result) => {
        if(err) throw err;
        console.log("working");
        res.send('Successfully gave playerID2 a GP and win.');
    });
});