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

describe('Create User /user/1.0.0/create', () => {

    describe('Correct submission of unique username and password', () => {
        test('200 status when sufficient username and password', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'username',
                Password: 'password'
            })
            expect(response.statusCode).toBe(200);
        })
        test('Checks to see if test user - username - was added to database', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'username',
                Password: 'password'
            })
            expect(response.statusCode).toBe(400);
        })
        test('The returned content type is JSON', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'username',
                Password: 'password'
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
    })

    describe('Insufficient or not unique username and password', () => {
        test('400 status when insufficient username only', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'use',
                Password: 'password'
            })
            expect(response.statusCode).toBe(400);
        })
        test('400 status when insufficient password only', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'username',
                Password: 'pas'
            })
            expect(response.statusCode).toBe(400);
        })
        test('400 status when insufficient username and password', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'use',
                Password: 'pas'
            })
            expect(response.statusCode).toBe(400);
        })
    })
});

describe('Login /user/1.0.0/:Username/:Password', () => {

    describe('Correct username/password combination', () => {
        test('200 status when correct username/password combination', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: 'password'}).send();
            expect(response.statusCode).toBe(200);
        })
        test('User object retrieved on login', async () => {//not currently parsing object properly!!
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: 'password'}).send();
            expect(response.res.text).toMatch(/"Username":"username","GP":0,"Wins":0,"Losses":0,"Ties":0,"Abandons":0,"WinPerc":0,"Password":"password"/);
        })
    })

    describe('Incorrect username/password combination', () => {
        test('400 status when incorrect username/password combination', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: '12345'}).send();
            expect(response.statusCode).toBe(400);
        })
        test('400 status when username not in database', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: '11111111111111', Password: '12345'}).send();
            expect(response.statusCode).toBe(400);
        })
    })
});

// describe('Stat mod endpoints', () => {
//     describe('At start of game, player gets +1GP, +1Abandon', () => {
//         test('200 Status when making game_start stat alteration', async () => {
//             const response = await request.put('/user/1.0.0/game_started').send({
//                 Username: 'username'
//             })
//             expect(response.statusCode).toBe(200);
//         })
//         test('+1GP and +1Abanadon added to database', async () => {
//             const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: 'password'}).send();
//             console.log(response);
//             expect(response.body.text).toMatch(/"Username":"username","GP":1,"Wins":0,"Losses":0,"Ties":0,"Abandons":1,"WinPerc":0,"Password":"password"/);
//         })
//     })
// })

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