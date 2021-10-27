process.env.NODE_ENV = "test";
const express = require('express');
const app = require('../apptest.js');
const supertest = require('supertest');
const request = supertest(app);
const mysql = require('mysql');
const dbFunction = require('./test_functions.js');
require('dotenv').config();
app.use(express.json());

let sql2 = "INSERT INTO test_stats (Username, GP, Wins, Losses, Ties, Abandons, WinPerc, Password)" + 
                        "VALUES ('userLogin', 20, 5, 5, 5, 5, 33, 'passLogin')," + 
                        "('userGame_Start', 0, 0, 0, 0, 0, 0, 'passGame_Start')," +
                        "('userGame_Win', 10, 1, 0, 0, 9, 10, 'passGame_Win')," +
                        "('userGame_Loss', 30, 1, 0, 0, 29, 3, 'passGame_Loss')," +
                        "('userGame_Tie', 100, 49, 0, 0, 51, 50, 'passGame_Tie')," +
                        "('userGP_Rank', 3, 3, 0, 0, 0, 100, 'passGP_Rank')," +
                        "('userWins_Rank', 6, 2, 4, 0, 3, 33, 'passWins_Rank')," +
                        "('userWin%_Rank', 10, 4, 6, 0, 0, 40, 'passWin%_Rank');";

describe('userstats/1.0.0/leaderboard  -  Requesting leaderboard retrieval', () => {
    beforeAll(async () => {
        await dbFunction.setup(sql2);    
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

    afterAll(async () => {
        await dbFunction.breakdown();
    });    
})