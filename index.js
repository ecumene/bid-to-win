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
        res.send("mADE DATABASE");
    })
});

app.put('/user', (req, res) => {
    let sql = "INSERT INTO leaderboard.user_stats (ID, Username, GP, Wins, Losses, Ties, Abandons)" +
                "VALUES ('3', 'Another-Test', '0', '0', '0', '0', '0')";
    db.query(sql, req.body, (err, result) => {
        if(err) throw err;
        console.log("working");
        res.send('Successfully added new user to database.');
    })
})