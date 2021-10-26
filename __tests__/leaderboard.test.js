process.env.NODE_ENV = "test";
const express = require('express');
const app = require('../apptest.js');
const supertest = require('supertest');
const request = supertest(app);
const mysql = require('mysql');
require('dotenv').config();
app.use(express.json());
let create = 0;

// const db = app.db;

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

describe('userstats/1.0.0/leaderboard  -  Requesting leaderboard retrieval', () => {
    beforeAll(() => {
        let sql1 = "CREATE TABLE test_stats (" +
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
        let sql2 = "INSERT INTO test_stats (Username, GP, Wins, Losses, Ties, Abandons, WinPerc, Password)" + 
                        "VALUES ('userLogin', 20, 5, 5, 5, 5, 33, 'passLogin')," + 
                        "('userGame_Start', 0, 0, 0, 0, 0, 0, 'passGame_Start')," +
                        "('userGame_Win', 10, 1, 0, 0, 9, 10, 'passGame_Win')," +
                        "('userGame_Loss', 30, 1, 0, 0, 29, 3, 'passGame_Loss')," +
                        "('userGame_Tie', 100, 49, 0, 0, 51, 50, 'passGame_Tie')," +
                        "('userGP_Rank', 3, 3, 0, 0, 0, 100, 'passGP_Rank')," +
                        "('userWins_Rank', 6, 2, 4, 0, 3, 33, 'passWins_Rank')," +
                        "('userWin%_Rank', 10, 4, 6, 0, 0, 40, 'passWin%_Rank');";
        let sql3 = 'RENAME TABLE user_stats TO user_stats_original;';
        let sql4 = 'RENAME TABLE test_stats TO user_stats;';
                        
    
        const dbCreation = db.query(sql1, (err, res) => {
            if(err){
                console.log('Unable to prepare test database');
            } else {
                db.query(sql2, (err, res) => {
                    if (err){
                        console.log('Unable to insert test users.');
                    } else {
                        db.query(sql3, (err, res) => {
                            if (err){
                                console.log('Unable to alter existing database name.');
                            } else {
                                db.query(sql4, (err, res) => {
                                    if (err){
                                        console.log('Unable to alter test database name.');
                                    } else {
                                        console.log('test database successfully prepared');
                                    }
                                })
                            }
                        })
                    }
                })
            }
            
        });
    
    });
    
    afterAll(() => {
        let sql1 = 'DROP TABLE user_stats;';
        let sql2 = 'RENAME TABLE user_stats_original TO user_stats;';
    
        db.query(sql1, (err, res) => {
            if(err){
                console.log('unable to drop test database.');
            } else {
                db.query(sql2, (err, res) => {
                    if(err){
                        console.log('unable to reset name of existing database.');
                    } else {
                        console.log('test database broken down');
                    }
                })
                
            }
        });
    });

    test('Returns 200 status, and json object with correctly ordered leaderboard', async () => {
        const response = await request.get('/userstats/1.0.0/leaderboard').send();
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj1 = r.data[0];
        let obj2 = r.data[1];
        let obj3 = r.data[2];
        let obj4 = r.data[3];
        let obj5 = r.data[4];
        let obj6 = r.data[5];
        let obj7 = r.data[6];
        let obj8 = r.data[7];
        expect(obj1.Username).toEqual('userGP_Rank');
        expect(obj2.Username).toEqual('userGame_Tie');
        expect(obj3.Username).toEqual('userWin%_Rank');
        expect(obj4.Username).toEqual('userLogin');
        expect(obj5.Username).toEqual('userWins_Rank');
        expect(obj6.Username).toEqual('userGame_Win');
        expect(obj7.Username).toEqual('userGame_Start');
        expect(obj8.Username).toEqual('userCreate');
    })

    // test('returns 400 status when not connected to database', async () => {
    //     const response = await request.get('/userstats/1.0.0/leaderboard').send();
    //     expect(response.statusCode).toBe(400);
    // })    
})