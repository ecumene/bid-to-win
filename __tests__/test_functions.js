const express = require('express');
const mysql = require('mysql');
const app = require('../apptest.js');
require('dotenv').config();

const db = mysql.createConnection({
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
const sql3 = "RENAME TABLE user_stats TO user_stats_original, test_stats TO user_stats;";
const sql5 = 'DROP TABLE user_stats;';
const sql6 = 'RENAME TABLE user_stats_original TO user_stats;';

function setup(sql2){
    let promises = [];   
     
    Promise.all(promises)
    .then (db.query(sql1, (err) => {
        if(err){
            throw err
        } else {
            db.query(sql2, (err) => {
                if(err){
                    throw err
                } else {
                    db.query(sql3, (err) => {
                        if (err){
                            throw err
                        } else {
                            return;
                        }                        
                    })
                }
            })
        }
    }));
}

function breakdown(){
    let promises = [];

    Promise.all(promises)
    .then (db.query(sql5, (err) => {
        if (err){
            throw err
        } else {
            db.query(sql6, (err, end) => {
                if (err){
                    throw err
                } else {
                    db.end();
                    return;
                }
            })
        }
    }));
}

module.exports = {setup, breakdown};