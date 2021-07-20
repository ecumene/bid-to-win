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

app.listen('3000', () => {
    console.log("Step One");
});