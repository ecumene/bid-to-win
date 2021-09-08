const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
app.use(express.json());
app.use(cors());
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHBS = require('express-handlebars');
const expressVDR = require('express-validator');//using an older version, because 6.0.0 doesn't 
const flash = require('connect-flash');
const session = require('express-session');
const LocalStrat = require('passport-local').Strategy;


app.use(express.json());
app.use(express.static('./'));
app.use(morgan('dev'));
app.use(cookieParser());
// app.set('views', path.join(__dirname, './'));//need clarification on what this does
// app.engine('handlebars', expressHBS({defaultLayout:'layout'}));
// app.set('view engine', 'handlebars');

app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

app.use(expressVDR({
    errorFormatter: function(param, msg, value){
        let namespace = param.split('.'),
        root = namespace.shift(),
        formParam = root;

        while(namespace.length){
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

app.use(flash());

//this is to create global variables for your flash messages
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');//need this extra one because passport sets it's own error messages to this
    next();
});

//routes handlers
const userstats = require('./routes/userstats.js');
const user = require('./routes/user.js');
app.use('/user_stats', userstats); //deals with fetching user and leaderboard stats for display
app.use('/user', user); //deals with logging in and updating user stats during games
console.log('in '+app.settings.env+' mode');

app.listen(process.env.PORT || 31801, () => {
    console.log('Listening on Port '+ process.env.PORT);
});

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
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