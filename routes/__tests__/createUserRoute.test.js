process.env.NODE_ENV = "test";
const app = require('../../apptest.js');
const supertest = require('supertest');
const request = supertest(app);
const dbFunction = require('../../testFunctions.js');
require('dotenv').config();

let addUsers = "INSERT INTO test_stats (Username, GP, Wins, Losses, Ties, Abandons, WinPerc, Password)" + 
                "VALUES ('createBlock', 0, 0, 0, 0, 0, 0, 'password');"; 

describe('user/1.0.0/create  -  Attempting to create a user', () => {
    beforeAll(async () => {
        await dbFunction.setup(addUsers);
    });

    afterAll(async () => {
        await dbFunction.breakdown();
    });

    test('with a username of insufficient length, returns a 400 status and a corresponding message', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: 'use',
            Password: 'passCreate'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        expect(JSON.parse(response.text).data[0].msg).toEqual('Username must be between 4 and 14 characters');
    })
    test('with a password of insufficient length, returns a 400 status and a corresponding message', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: 'userCreate',
            Password: 'pas'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        expect(JSON.parse(response.text).data[0].msg).toEqual('Password must be between 4 and 14 characters');
    })
    test('with a blank username field, returns a 400 status and a corresponding message.', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: '',
            Password: 'passCreate'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        expect(JSON.parse(response.text).data[0].msg).toEqual('Must provide username');
    })
    test('with a blank password field, returns a 400 status and a corresponding message.', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: 'userCreate',
            Password: ''
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        expect(JSON.parse(response.text).data[0].msg).toEqual('Must provide password');
    })
})







