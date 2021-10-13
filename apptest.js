const express = require('express');

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

    const app = express();
    const router = express.Router();
    router.use(express.json());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    const mysql = require('mysql');
    require('dotenv').config();

    const user = require('./routes/user.js');
    app.use('/user', user);

    module.exports = app;


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