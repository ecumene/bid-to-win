const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const cors = require('cors');
const morgan = require('morgan');
app.use(express.json());
app.use(cors());
const userstats = require('./routes/userstats.js');
const user = require('./routes/user.js');
console.log('in '+app.settings.env+' mode');

app.use(express.json());
app.use(express.static('./'));
app.use(morgan('dev'));
app.use('/user_stats', userstats); //deals with fetching user and leaderboard stats for display
app.use('/user', user); //deals with logging in and updating user stats during games

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on Port '+ process.env.PORT);
});

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

//Removes user from database. NOT YET IMPLEMENTED//
app.delete('/1.0.0/delete_user', (req, res) => {
    let sql = 'DELETE FROM user_stats WHERE ID=?'
    db.query (sql, req.body.ID, (err, result) => {
        if(err) {throw err;
        } else {
        console.log('Deleted user');
        res.send(result);
        }
    });
});