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
                "VALUES ('createBlock', 0, 0, 0, 0, 0, 0, 'password');"; 

describe('user/1.0.0/create  -  Attempting to create a user', () => {
    beforeAll(async () => {
        await dbFunction.setup(sql2);
    });

    afterAll(async () => {
        await dbFunction.breakdown();
    });
    
    test('correctly, returns a 200 status with a json content-type.', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: 'userCreate',
            Password: 'passCreate'
        })
        expect(response.type).toEqual('application/json');
        expect(response.statusCode).toBe(200);
    })
    test('when the username already exists, returns a 400 status, and corresponding message.', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: 'createBlock',
            Password: 'password'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("Username already exists");
    })
    test('with a username of insufficient length, returns a 400 status and a corresponding message', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: 'use',
            Password: 'passCreate'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual('Username must be between 4 and 14 characters');
    })
    test('with a password of insufficient length, returns a 400 status and a corresponding message', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: 'userCreate',
            Password: 'pas'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual('Password must be between 4 and 14 characters');
    })
    test('with a blank username field, returns a 400 status and a corresponding message.', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: '',
            Password: 'passCreate'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual('Must provide username');
    })
    test('with a blank password field, returns a 400 status and a corresponding message.', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: 'userCreate',
            Password: ''
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual('Must provide password');
    })
})







