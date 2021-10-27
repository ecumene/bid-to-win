process.env.NODE_ENV = "test";
const express = require('express');
const app = require('../apptest.js');
const supertest = require('supertest');
const request = supertest(app);
const mysql = require('mysql');
require('dotenv').config();
app.use(express.json());

let sql2 = "INSERT INTO test_stats (Username, GP, Wins, Losses, Ties, Abandons, WinPerc, Password)" + 
                "VALUES ('userGame_Start', 0, 0, 0, 0, 0, 0, 'passGame_Start')," +
                "('userGame_Win', 10, 1, 0, 0, 9, 10, 'passGame_Win')," +
                "('userGame_Loss', 30, 1, 0, 0, 29, 3, 'passGame_Loss')," +
                "('userGame_Tie', 100, 49, 0, 0, 51, 50, 'passGame_Tie'),";

describe('/user/1.0.0  -  During gameplay,', () => {
    beforeAll(async () => {
        await dbFunction.setup(sql2);    
    });

    test('starting a new game should return a 200 status.', async () => {
        const response = await request.put('/user/1.0.0/game_started').send({
            Username: 'userGame_Start'
        })
        expect(response.statusCode).toBe(200);
    })
    test('starting a new game with unregistered username returns 400, and corresponding message', async () => {
        const response = await request.put('/user/1.0.0/game_started').send({
            Username: 'userFalse'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No login detected.");
    })
    test('starting a new game adds 1 GP and 1 Abandon to the database for the user.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userGame_Start', Password: 'passGame_Start'}).send();
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.GP && obj.Abandons).toEqual(1);
    })
    test('winning a game returns a 200 status.', async () => {
        const response = await request.put('/user/1.0.0/win').send({
            Username: 'userGame_Win',
            WinPerc: 20
        })
        expect(response.statusCode).toBe(200);
    })
    test('winning a game with unregistered username returns a 400 status, and corresponding message.', async () => {
        const response = await request.put('/user/1.0.0/win').send({
            Username: 'userFalse'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No login detected.");
    })
    test('1 Win is added to and 1 Abandon subtracted from the database when the user wins.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userGame_Win', Password: 'passGame_Win'}).send();
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.Wins).toEqual(2);
        expect(obj.Abandons).toEqual(8);
    })
    test('losing a game returns a 200 status', async () => {
        const response = await request.put('/user/1.0.0/loss').send({
            Username: 'userGame_Loss',
            WinPerc: 3
        })
        expect(response.statusCode).toBe(200);
    })
    test('losing a game with an unregistered username returns a 400 status and corresponding message.', async () => {
        const response = await request.put('/user/1.0.0/loss').send({
            Username: 'userFalse'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No login detected.");
    })
    test('1 Loss is added to and 1 Abandon subtracted from the database when user loses.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userGame_Loss', Password: 'passGame_Loss'}).send();
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.Losses).toEqual(1);
        expect(obj.Abandons).toEqual(28);  
    })      
    test('tieing a game returns a 200 status.', async () => {
        const response = await request.put('/user/1.0.0/tie').send({
            Username: 'userGame_Tie',
            WinPerc: 50
        })
        expect(response.statusCode).toBe(200);
    })
    test('tieing a game with an unregistered username returns a 400 status and corresponding message.', async () => {
        const response = await request.put('/user/1.0.0/tie').send({
            Username: 'userFalse'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No login detected.");
    })
    test('1 Tie is added to and 1 Abandon subtracted from the database when user ties.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userGame_Tie', Password: 'passGame_Tie'}).send();
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.Ties).toEqual(1);
        expect(obj.Abandons).toEqual(50);            
    })

    afterAll(async () => {
        await dbFunction.breakdown();
    })
})