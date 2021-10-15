process.env.NODE_ENV = "test";
const express = require('express');
const app = require('../apptest.js');
const supertest = require('supertest');
const request = supertest(app);
const mysql = require('mysql');
require('dotenv').config();
app.use(express.json());

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

// beforeAll((req, res) => {
//     let sql = 'CREATE TABLE test_stats AS SELECT * FROM user_stats;' +
//                 'RENAME TABLE user_stats TO user_stats_original;' +
//                 'RENAME TABLE test_stats TO user_stats;';
//     db.query(sql, (err, result) => {
//         if(err){
//             return res.status(400).json({data: [{msg: "Unable to prepare test database."}]});
//         } else {
//             return res.status(200).json({data: [{msg: "Test database prepared."}]});
//         }
        
//     });
// });

// afterAll((req, res) => {
//     let sql = 'DROP TABLE user_stats;' +
//                 'RENAME TABLE user_stats_original TO user_stats;';
//     db.query(sql, (err, result) => {
//         if(err){
//             return res.status(400).json({data: [{msg: 'unable to reset database.'}]})
//         } else {
//             return res.status(200).json({data:[{msg: 'database reset to existing condition.'}]})
//         }
//     });
// });

describe('CREATE USER TESTS /user/1.0.0/create', () => {
    describe('Correct submission of unique username and password', () => {
        test('returns a 200 status with a json content-type.', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'username',
                Password: 'password'
            })
            expect(response.type).toEqual('application/json');
            expect(response.statusCode).toBe(200);
        })
        test('fails if the user already exists in the database.', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'username',
                Password: 'password'
            })
            expect(response.statusCode).toBe(400);
        })
    })

    describe('Attempting to create a user', () => {
        test('With a username of insufficient length, returns a 400 status', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'use',
                Password: 'password'
            })
            expect(response.statusCode).toBe(400);
        })
        test('with a password of insufficient length, returns a 400 status', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'username',
                Password: 'pas'
            })
            expect(response.statusCode).toBe(400);
        })
        test('with a blank username field, returns a 400 status', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: '',
                Password: 'password'
            })
            expect(response.statusCode).toBe(400);
        })
        test('with a blank password field, returns a 400 status', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'username',
                Password: ''
            })
            expect(response.statusCode).toBe(400);
        })
    })
});

describe('LOGIN USER TESTS /user/1.0.0/:Username/:Password', () => {

    describe('Correct submission of username and password combination', () => {
        test('returns a 200 status.', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: 'password'}).send();
            expect(response.statusCode).toBe(200);
        })
        test('returns object with user stats as a json object.', async () => {//not currently parsing object properly!!
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: 'password'}).send();
            expect(response.type).toEqual('application/json');
            expect(response.text).toMatch(/"Username":"username","GP":0,"Wins":0,"Losses":0,"Ties":0,"Abandons":0,"WinPerc":0,"Password":"password"/);
        })
    })

    describe('Submission of username, with incorrect password', () => {
        test('returns a 400 status.', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: '12345'}).send();
            expect(response.statusCode).toBe(400);
        })
        test('does not return an object with user stats.', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: '12345'}).send();
            expect(response.text).not.toMatch(/"Username":"username"/);
        })
    })
    describe('Submission of username that is not in the database', () => {
        test('returns a 400 status.', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: '11111111111111', Password: '12345'}).send();
            expect(response.statusCode).toBe(400);
        })
        test('does not return an object with user stats.', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: '11111111111111', Password: '12345'}).send();
            expect(response.text).not.toMatch(/"Username":"username"/);
        })
    })
});

describe('GAME STARTED TESTS /user/1.0.0/game_started', () => {
    describe('At the start of a game', () => {
        test('a 200 status is returned during stat modification.', async () => {
            const response = await request.put('/user/1.0.0/game_started').send({
                Username: 'username'
            })
            expect(response.statusCode).toBe(200);
        })
        test('1 GP and 1 Abandon get added to the database for the user.', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: 'password'}).send();
            expect(response.text).toMatch(/"Username":"username","GP":1,"Wins":0,"Losses":0,"Ties":0,"Abandons":1,"WinPerc":0,"Password":"password"/);
        })
    })
})

describe('GAME ENDED TESTS /user/1.0.0/"win||loss||tie"', () => {
    describe('After the user wins a game', () => {
        test('a 200 status is returned during stat modification.', async () => {
            const response = await request.put('/user/1.0.0/win').send({
                Username: 'username'
            })
            expect(response.statusCode).toBe(200);
        })
        test('1 Win is added to and 1 Abandon subtracted from the database.', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: 'password'}).send();
            expect(response.text).toMatch(/"Username":"username","GP":1,"Wins":1,"Losses":0,"Ties":0,"Abandons":0,"WinPerc":0,"Password":"password"/);
        })
    })
    describe('After the user loses a game', () => {
        test('a 200 status is returned during stat modification.', async () => {
            const response = await request.put('/user/1.0.0/loss').send({
                Username: 'username'
            })
            expect(response.statusCode).toBe(200);
        })
        test('1 Loss is added to and 1 Abandon subtracted from the database.', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: 'password'}).send();
            expect(response.text).toMatch(/"Username":"username","GP":1,"Wins":1,"Losses":1,"Ties":0,"Abandons":-1,"WinPerc":0,"Password":"password"/);
        })
    })
    describe('After the user ties a game', () => {
        test('a 200 status is returned during stat modification.', async () => {
            const response = await request.put('/user/1.0.0/tie').send({
                Username: 'username'
            })
            expect(response.statusCode).toBe(200);
        })
        test('1 Tie is added to and 1 Abandon subtracted from the database.', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: 'password'}).send();
            expect(response.text).toMatch(/"Username":"username","GP":1,"Wins":1,"Losses":1,"Ties":1,"Abandons":-2,"WinPerc":0,"Password":"password"/);
        })
    })
})




// test ("simple addition", () => {
//     expect(2 + 2).toBe(4);
// })

// test('check test endpoint', async done => {
//     const res = await request.get('/test');
//     expect(res.status).toBe(200);
//     expect(res.body.message).toBe('Pass!');
//     console.log(res.body.message);
//     //done();
// });



// const userController = require('../controllers/user.js');

// login('login information relayed correctly', () =>{
//     expect(userController())
// })