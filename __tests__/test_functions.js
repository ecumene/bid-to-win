const mysql = require('mysql');

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

const sql1 = "CREATE TABLE test_stats (" +
                        "`ID` int(11) NOT NULL AUTO_INCREMENT," +
                        "`Username` varchar(45) NOT NULL," +
                        "`GP` int(11) NOT NULL," +
                        "`Wins` int(11) NOT NULL," +
                        "`Losses` int(11) NOT NULL," +
                        "`Ties` int(11) NOT NULL," +
                        "`Abandons` int(11) NOT NULL," +
                        "`WinPerc` int(11) NOT NULL," +
                        "`Password` varchar(45) NOT NULL," +
                        "PRIMARY KEY (`ID`)," +
                        "UNIQUE KEY `ID_UNIQUE` (`ID`)," +
                        "UNIQUE KEY `Username_UNIQUE` (`Username`)" +
                    ") ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;";

const sql3 = 'RENAME TABLE user_stats TO user_stats_original;';
const sql4 = 'RENAME TABLE test_stats TO user_stats;';
let sql5 = 'DROP TABLE user_stats;';
let sql6 = 'RENAME TABLE user_stats_original TO user_stats;';

function createBefore(){
        let sql2 = "INSERT INTO test_stats (Username, GP, Wins, Losses, Ties, Abandons, WinPerc, Password)" + 
                        "VALUES ('createBlock', 20, 5, 5, 5, 5, 33, 'password');";

        db.query(sql1);
        db.query(sql2);
        db.query(sql3);
        db.query(sql4);
}

function breakdown(){
    db.query(sql5);
    db.query(sql6);

    console.log('breakdown');
}

module.exports = {createBefore, breakdown};