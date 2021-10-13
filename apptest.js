const express = require('express');

function mainApp(db){
    const app = express();

    const mysql = require('mysql');
    require('dotenv').config();
    const cors = require('cors');
    const morgan = require('morgan');
    const path = require('path');
    app.use(express.json());
    app.use(cors());
    const passport = require('passport');
    const session = require('express-session');
    const LocalStrat = require('passport-local').Strategy;
    const {check , validationResult} = require('express-validator');

    app.use(express.urlencoded({extended: true}));
    app.use(express.static('./'));
    app.use(morgan('dev'));

    app.use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true,
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());

        //routes handlers
    //const userController = require('./controllers/user.js');
    const userstats = require('./routes/userstats.js');
    const user = require('./routes/user.js');
    // const userstatsController = require('./controllers/userstats.js');
    app.use('/user_stats', userstats); //deals with fetching user and leaderboard stats for display
    app.use('/user', user); //deals with logging in and updating user stats during games

    return app;
}


// function createTestDB(){
//     let sql = 'CREATE TABLE test_stats AS SELECT * FROM user_stats;' +
//                     'RENAME TABLE user_stats TO user_stats_original;' +
//                     'RENAME TABLE test_stats TO user_stats;';
//         db.query(sql, (err, result) => {
//             if(err){
//                 return res.status(400).json({data: [{msg: "Unable to prepare test database."}]});
//                 console.log('worked');
//             } else {
//                 return res.status(200).json({data: [{msg: "Test database prepared."}]});
//                 console.log('not so much');
//             }
           
//         })
// }

// function resetTestDB(){
//     let sql = 'DROP TABLE user_stats;' +
//                 'RENAME TABLE user_stats_original TO user_stats;';
//     db.query(sql, (err, result) => {
//         if(err){
//             return res.status(400).json({data: [{msg: 'unable to reset database.'}]})
//         } else {
//             return res.status(200).json({data:[{msg: 'database reset to existing condition.'}]})
//         }
//     })
// }