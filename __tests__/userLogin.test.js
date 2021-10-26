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

describe('user/1.0.0/:Username/:Password  -  Attempting to login as a user', () => {
    beforeAll(async () => {
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
                        "VALUES ('userLogin', 20, 5, 5, 5, 5, 33, 'passLogin');"
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

    test('correctly, returns a 200 status and a json object with user stats.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userLogin', Password: 'passLogin'}).send();
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.Username).toEqual('userLogin');
        expect(obj.Wins && obj.Losses && obj.Ties && obj.Abandons).toEqual(5);
    })
    test('with an incorrect password, returns a 400 status and corresponding message, with no user stats.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userLogin', Password: 'password'}).send();
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("Username and password do not match");
        expect(r.data.length).toEqual(1);
    })

    test('with non-recorded username, returns a 400 status and corresponding message, with no user stats.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userFalse', Password: 'passFalse'}).send();
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("Username doesn't exist");
        expect(r.data.length).toEqual(1);

    })
})