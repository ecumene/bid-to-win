const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '!Rangers1!',
    database: "leaderboard"
});

db.connect((err) => {
    if(err) throw err;
    console.log("Step two");
})

const app = express();

app.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE testdb";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("working");
        res.send('Database made');
    })
})

app.listen('3000', () => {
    console.log("Step One");
});