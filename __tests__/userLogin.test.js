process.env.NODE_ENV = "test";
const express = require('express');
const app = require('../apptest.js');
const supertest = require('supertest');
const request = supertest(app);
const mysql = require('mysql');
require('dotenv').config();
app.use(express.json());

describe('user/1.0.0/:Username/:Password  -  Attempting to login as a user', () => {
    beforeAll(async () => {
        await dbFunction.setup(sql2);    
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

    afterAll(async () => {
        await dbFunction.breakdown();
    });
})