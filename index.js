const express = require('express');
const mysql = require('mysql');
require('dotenv').config();
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
app.use(express.json());
app.use(cors({
    origin: 'https://dev-me72yarl.us.auth0.com'
}
));
const {auth} = require('express-openid-connect');
// const passport = require('passport');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const flash = require('connect-flash');
// const session = require('express-session');
// const LocalStrat = require('passport-local').Strategy;
// const {check , validationResult} = require('express-validator');

app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(express.static('./'));
app.use(morgan('dev'));
// app.use(cookieParser());

app.use(
    auth({
  //authRequired: false,
  //auth0Logout: true,  
  baseURL: 'https://bid-to-win.herokuapp.com',
  clientID: 'ZefBJkQ2tfiYvfVXxIF5PqM60yEU5pFa',
  issuerBaseURL: 'https://dev-me72yarl.us.auth0.com',
  secret: 'B2MtIf5eLXci_wviqjkc4dh6xF_CHt0HNv5_91WWYboGUUb85Oy-uTARyXh_JuJP'
}));

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
  });

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// passport.use(new LocalStrat(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       });
//     }
//   ));

// app.use(session({
//     secret: 'secret',
//     saveUninitialized: true,
//     resave: true,
//     store: sessionStore
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// app.use(flash());

//this is to create global variables for your flash messages
// app.use(function (req, res, next) {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');//need this extra one because passport sets it's own error messages to this
//     next();
// });

//routes handlers
const userstats = require('./routes/userstats.js');
const user = require('./routes/user.js');
// const { urlencoded } = require('body-parser');
app.use('/user_stats', userstats); //deals with fetching user and leaderboard stats for display
app.use('/user', user); //deals with logging in and updating user stats during games
console.log('in '+app.settings.env+' mode');

app.listen(process.env.PORT || 31801, () => {
    console.log('Listening on Port '+ process.env.PORT);
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