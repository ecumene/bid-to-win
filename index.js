const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const cors = require('cors');
const morgan = require('morgan');//this is where I left off//
app.use(express.json());
app.use(cors());
const userstats = require('./routes/userstats');
const user = require('./routes/user');
console.log('in '+app.settings.env+' mode');

app.use(express.json());
app.use(express.static('./'));
app.use(morgan('dev'));
app.use('/user_stats', userstats);
app.use('/user', user);

app.listen(process.env.PORT, () => {
    console.log('Listening on Port '+ process.env.PORT);
});

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

app.get('/leaderboard/1.0.0', (req, res) => {
    let sql = 'SELECT * FROM leaderboard.winperc_rank WHERE row_num < 11';
    db.query(sql, (err, rows) => {
        if(err) {throw err;
        } else {
        res.json(rows);
        }
    })
})

//Removes user from database. NOT YET IMPLEMENTED//
app.delete('/delete_user/1.0.0', (req, res) => {
    let sql = 'DELETE FROM leaderboard.user_stats WHERE ID=?'
    db.query (sql, req.body.ID, (err, result) => {
        if(err) {throw err;
        } else {
        console.log('Deleted user');
        res.send(result);
        }
    });
});