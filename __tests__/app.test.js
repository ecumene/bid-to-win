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

describe('user/1.0.0/create  -  Attempting to create a user', () => {
    test('correctly, returns a 200 status with a json content-type.', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: 'username',
            Password: 'password'
        })
        expect(response.type).toEqual('application/json');
        expect(response.statusCode).toBe(200);
    })
    test('when the username already exists, returns a 400 status, and corresponding message.', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: 'username',
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
            Password: 'password'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual('Username must be between 4 and 14 characters');
    })
    test('with a password of insufficient length, returns a 400 status and a corresponding message', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: 'username',
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
            Password: 'password'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual('Must provide username');
    })
    test('with a blank password field, returns a 400 status and a corresponding message.', async () => {
        const response = await request.post('/user/1.0.0/create').send({
            Username: 'username',
            Password: ''
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual('Must provide password');
    })
})

describe('user/1.0.0/:Username/:Password  -  Attempting to login as a user', () => {
    test('correctly, returns a 200 status and a json object with user stats.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: 'password'}).send();
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.Username).toEqual('username');
        expect(obj.GP && obj.Wins && obj.Losses && obj.Ties && obj.WinPerc && obj.Abandons).toEqual(0);
    })
    test('with an incorrect password, returns a 400 status and corresponding message, with no user stats.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: '12345'}).send();
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("Username and password do not match");
        expect(r.data.length).toEqual(1);
    })

    test('with non-recorded username, returns a 400 status and corresponding message, with no user stats.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: '11111111111111', Password: '12345'}).send();
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("Username doesn't exist");
        expect(r.data.length).toEqual(1);

    })
})

describe('/user/1.0.0/game_started  -  Starting a new game', () => {    
    test('when logged in as registered user, returns a 200 status.', async () => {
        const response = await request.put('/user/1.0.0/game_started').send({
            Username: 'username'
        })
        expect(response.statusCode).toBe(200);
    })
    test('when username is not registered in database, returns a 400 status and corresponding message', async () => {
        const response = await request.put('/user/1.0.0/game_started').send()
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No log in detected.");
    })
    test('1 GP and 1 Abandon get added to the database for the user.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: 'password'}).send();
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.GP && obj.Abandons).toEqual(1);
    })    
})

describe('user/1.0.0/win  -  After the user wins a game', () => {
    test('a 200 status is returned during stat modification.', async () => {
        const response = await request.put('/user/1.0.0/win').send({
            Username: 'username'
        })
        expect(response.statusCode).toBe(200);
    })
    test('1 Win is added to and 1 Abandon subtracted from the database.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: 'password'}).send();
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.Wins).toEqual(1);
        expect(obj.Abandons).toEqual(0);
    })
})
    
describe('user/1.0.0/loss  -  After the user loses a game', () => {
        test('a 200 status is returned during stat modification.', async () => {
            const response = await request.put('/user/1.0.0/loss').send({
                Username: 'username'
            })
            expect(response.statusCode).toBe(200);
        })
        test('1 Loss is added to and 1 Abandon subtracted from the database.', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'username', Password: 'password'}).send();
            let r = JSON.parse(response.text);
            let obj = r.data[0];
            expect(obj.Losses).toEqual(1);
            expect(obj.Abandons).toEqual(-1);  
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
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.Ties).toEqual(1);
        expect(obj.Abandons).toEqual(-2);            
    })
})

describe('STAT RANK TESTS /userstats/1.0.0/"gprank|winsrank|winperrank"/:Username', () => {
    describe('Requesting the GP rank of the user', () => {
        test('returns a 400 status when not logged in, and does not return an object of user ranks.', async () => {
            const response = await request.get('/userstats/1.0.0/gprank/:Username').query({Username: ''}).send();
            expect(response.statusCode).toBe(400);
            expect(response.text).not.toMatch(/"Username":/)
        })
        test('returns a 400 status when username is not in the database, and does not return an object of user ranks.', async () => {
            const response = await request.get('/userstats/1.0.0/gprank/:Username').query({Username: 'JimBob'}).send();
            expect(response.statusCode).toBe(400);
            expect(response.text).not.toMatch(/"Username":/)
        })
        test('returns a 200 status when valid user is logged in.', async () => {
            const response = await request.get('/userstats/1.0.0/gprank/:Username').query({Username: 'username'}).send();
            expect(response.statusCode).toBe(200);
        })
        test('returns a json object with correct GP rank, when valid user is logged in.', async () => {
            const response = await request.get('/userstats/1.0.0/gprank/:Username').query({Username: 'username'}).send();
            expect(response.type).toEqual('application/json');
            expect(response.text).toMatch(/"Username":"username","GP":1,"row_num":4/);
        })
    })
    describe('Requesting the Wins rank of the user', () => {
        test('returns a 400 status when not logged in, and does not return an object of user ranks.', async () => {
            const response = await request.get('/userstats/1.0.0/winsrank/:Username').query({Username: ''}).send();
            expect(response.statusCode).toBe(400);
            expect(response.text).not.toMatch(/"Username":/)
        })
        test('returns a 400 status when username is not in the database, and does not return an object of user ranks.', async () => {
            const response = await request.get('/userstats/1.0.0/winsrank/:Username').query({Username: 'JimBob'}).send();
            expect(response.statusCode).toBe(400);
            expect(response.text).not.toMatch(/"Username":/)
        })
        test('returns a 200 status when valid user is logged in.', async () => {
            const response = await request.get('/userstats/1.0.0/winsrank/:Username').query({Username: 'username'}).send();
            expect(response.statusCode).toBe(200);
        })
        test('returns a json object with correct Wins rank, when valid user is logged in.', async () => {
            const response = await request.get('/userstats/1.0.0/winsrank/:Username').query({Username: 'username'}).send();
            expect(response.type).toEqual('application/json');
            expect(response.text).toMatch(/"Username":"username","Wins":1,"row_num":3/);
        })
    })
    describe('Requesting the Win Percentage rank of the user', () => {
        test('returns a 400 status when not logged in, and does not return an object of user ranks.', async () => {
            const response = await request.get('/userstats/1.0.0/winperrank/:Username').query({Username: ''}).send();
            expect(response.statusCode).toBe(400);
            expect(response.text).not.toMatch(/"Username":/)
        })
        test('returns a 400 status when username is not in the database, and does not return an object of user ranks.', async () => {
            const response = await request.get('/userstats/1.0.0/winperrank/:Username').query({Username: 'JimBob'}).send();
            expect(response.statusCode).toBe(400);
            expect(response.text).not.toMatch(/"Username":/)
        })
        test('returns a 200 status when valid user is logged in.', async () => {
            const response = await request.get('/userstats/1.0.0/winperrank/:Username').query({Username: 'username'}).send();
            expect(response.statusCode).toBe(200);
        })
        test('returns a json object with correct Win Percentage rank, when valid user is logged in.', async () => {
            const response = await request.get('/userstats/1.0.0/winperrank/:Username').query({Username: 'username'}).send();
            expect(response.type).toEqual('application/json');
            expect(response.text).toMatch(/"Username":"username","WinPerc":0,"row_num":10/);
        })
    })
})

describe('LEADERBOARD TESTS /userstats/1.0.0/leaderboard', () => {
    describe('Requesting leaderboard retrieval', () => {
        // test('returns 400 status when not connected to database', async () => {
        //     const response = await request.get('/userstats/1.0.0/leaderboard').send();
        //     expect(response.statusCode).toBe(400);
        // })
        test('Returns 200 status, and json object with correctly ordered leaderboard', async () => {
            const response = await request.get('/userstats/1.0.0/leaderboard').send();
            expect(response.statusCode).toBe(200);
            expect(response.type).toEqual('application/json');
            //expect(response.text).toMatch(//need to parse here
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