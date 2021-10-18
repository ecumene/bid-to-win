process.env.NODE_ENV = "test";
const express = require('express');
const app = require('../apptest.js');
const supertest = require('supertest');
const request = supertest(app);
const mysql = require('mysql');
require('dotenv').config();
app.use(express.json());
let create = 0;

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

describe('userstats/1.0.0/gprank/:Username  -  Requesting the rank of the user', () => {
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
        let sql2 = "INSERT INTO test_stats ('userGP_Rank', 3, 3, 0, 0, 0, 100, 'passGP_Rank')," +
                        "('userWins_Rank', 6, 5, 4, 0, 3, 33, 'passWins_Rank')," +
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
                    } else {}
                })
                
            }
        });
    });

    test('when it is the GP, correctly, returns 200 status and a json object with correct GP rank.', async () => {
        const response = await request.get('/userstats/1.0.0/gprank/:Username').query({Username: 'userGP_Rank'}).send();
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.row_num).toEqual(3);
    })
    test('when it is the GP, when not logged in, returns a 400 status, corresponding message, and no user rank object.', async () => {
        const response = await request.get('/userstats/1.0.0/gprank/:Username').query({Username: ''}).send();
        expect(response.statusCode).toBe(400);
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No login detected.");
        expect(r.data.length).toEqual(1);
    })
    test('when it is the GP, but username is not in the database, returns a 400 status, corresponding message, and no user rank object.', async () => {
        const response = await request.get('/userstats/1.0.0/gprank/:Username').query({Username: 'userFalse'}).send();
        expect(response.statusCode).toBe(400);
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No login detected.");
        expect(r.data.length).toEqual(1);
    })
    test('when it the Wins, correctly, returns 200 status and a json object with correct Wins rank.', async () => {
        const response = await request.get('/userstats/1.0.0/winsrank/:Username').query({Username: 'userWins_Rank'}).send();
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.row_num).toEqual(1);
    })
    test('when it is the Wins, but user is not logged in, returns a 400 status, corresponding message, and no user rank object.', async () => {
        const response = await request.get('/userstats/1.0.0/winsrank/:Username').query({Username: ''}).send();
        expect(response.statusCode).toBe(400);
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No login detected.");
        expect(r.data.length).toEqual(1);
    })
    test('when it is the Wins, but username is not in the database, returns a 400 status, corresponding message, and no user rank object.', async () => {
        const response = await request.get('/userstats/1.0.0/winsrank/:Username').query({Username: 'userFalse'}).send();
        expect(response.statusCode).toBe(400);
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No login detected.");
        expect(r.data.length).toEqual(1);
    })
    test('when it is the Win%, correctly, returns 200 status and a json object with correct Win Percentage rank.', async () => {
        const response = await request.get('/userstats/1.0.0/winperrank/:Username').query({Username: 'userWin%_Rank'}).send();
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.row_num).toEqual(2);
    })
    test('when it is the W%, but user is not logged in, returns a 400 status, corresponding message, and no user rank object.', async () => {
        const response = await request.get('/userstats/1.0.0/winperrank/:Username').query({Username: ''}).send();
        expect(response.statusCode).toBe(400);
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No login detected.");
        expect(r.data.length).toEqual(1);
    })
    test('when it is the Win%, but username is not in the database, returns a 400 status, corresponding message, and no user rank object.', async () => {
        const response = await request.get('/userstats/1.0.0/winperrank/:Username').query({Username: 'userFalse'}).send();
        expect(response.statusCode).toBe(400);
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No login detected.");
        expect(r.data.length).toEqual(1);
    })
})