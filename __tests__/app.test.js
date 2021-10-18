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

beforeAll((req, res) => {
    let sql = "CREATE TABLE test_stats (" +
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
                ") ENGINE=InnoDB AUTO_INCREMENT=3665 DEFAULT CHARSET=utf8;" +
                "INSERT INTO test_stats (Username, GP, Wins, Losses, Ties, Abandons, WinPerc, Password)" + 
                    "VALUES ('userLogin', 20, 5, 5, 5, 5, 33, 'passLogin')," + 
                    "('userGame_Start', 0, 0, 0, 0, 0, 0, 'passGame_Start')," +
                    "('userGame_Win', 10, 1, 0, 0, 9, 10, 'passGame_Win')," +
                    "('userGame_Loss', 30, 1, 0, 0, 29, 3, 'passGame_Loss')," +
                    "('userGame_Tie', 100, 49, 0, 0, 51, 50, 'passGame_Tie')," +
                    "('userGP_Rank', 3, 3, 0, 0, 0, 100, 'passGP_Rank')," +
                    "('userWins_Rank', 6, 2, 4, 0, 3, 33, 'passWins_Rank')," +
                    "('userWin%_Rank', 10, 4, 6, 0, 0, 40, 'passWin%_Rank');" + 
                'RENAME TABLE user_stats TO user_stats_original;' +
                'RENAME TABLE test_stats TO user_stats;';
    db.query(sql, (err, result) => {
        if(err){
            console.log(err);
            return res.status(400).json({data: [{msg: "Unable to prepare test database."}]});
        } else {
            console.log('success');
            return res.status(200).json({data: [{msg: "Test database prepared."}]});
        }
        
    });
});

afterAll((req, res) => {
    let sql = 'DROP TABLE user_stats;' +
                'RENAME TABLE user_stats_original TO user_stats;';
    db.query(sql, (err, result) => {
        if(err){
            return res.status(400).json({data: [{msg: 'unable to reset database.'}]})
        } else {
            return res.status(200).json({data:[{msg: 'database reset to existing condition.'}]})
        }
    });
});

describe('user/1.0.0/create  -  Attempting to create a user', () => {
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
            Username: 'userLogin',
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

describe('user/1.0.0/:Username/:Password  -  Attempting to login as a user', () => {
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

describe('/user/1.0.0/game_started  -  Starting a new game', () => {    
    test('when logged in as registered user, returns a 200 status.', async () => {
        const response = await request.put('/user/1.0.0/game_started').send({
            Username: 'userGame_Start'
        })
        expect(response.statusCode).toBe(200);
    })
    test('when username is not registered in database, returns a 400 status and corresponding message', async () => {
        const response = await request.put('/user/1.0.0/game_started').send({
            Username: 'userFalse'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No log in detected.");
    })
    test('1 GP and 1 Abandon get added to the database for the user.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userGame_Start', Password: 'passGame_Start'}).send();
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.GP && obj.Abandons).toEqual(1);
    })    
})

describe('user/1.0.0/win  -  After the user wins a game', () => {
    test('a 200 status is returned during stat modification.', async () => {
        const response = await request.put('/user/1.0.0/win').send({
            Username: 'userGame_Win'
        })
        expect(response.statusCode).toBe(200);
    })
    test('when username is not registered in database, returns a 400 status and corresponding message', async () => {
        const response = await request.put('/user/1.0.0/win').send({
            Username: 'userFalse'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No log in detected.");
    })
    test('1 Win is added to and 1 Abandon subtracted from the database.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userGame_Win', Password: 'passGame_Win'}).send();
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.Wins).toEqual(2);
        expect(obj.Abandons).toEqual(8);
    })
})
    
describe('user/1.0.0/loss  -  After the user loses a game', () => {
        test('a 200 status is returned during stat modification.', async () => {
            const response = await request.put('/user/1.0.0/loss').send({
                Username: 'userGame_Loss'
            })
            expect(response.statusCode).toBe(200);
        })
        test('when username is not registered in database, returns a 400 status and corresponding message', async () => {
            const response = await request.put('/user/1.0.0/loss').send({
                Username: 'userFalse'
            })
            expect(response.statusCode).toBe(400);
            expect(response.type).toEqual('application/json');
            let r = JSON.parse(response.text);
            let obj = r.data[0];
            expect(obj.msg).toEqual("No log in detected.");
        })
        test('1 Loss is added to and 1 Abandon subtracted from the database.', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userGame_Loss', Password: 'passGame_Loss'}).send();
            let r = JSON.parse(response.text);
            let obj = r.data[0];
            expect(obj.Losses).toEqual(1);
            expect(obj.Abandons).toEqual(28);  
        })      
})
    
describe('user/1.0.0/tie  -  After the user ties a game', () => {
    test('a 200 status is returned during stat modification.', async () => {
        const response = await request.put('/user/1.0.0/tie').send({
            Username: 'userGame_Tie'
        })
        expect(response.statusCode).toBe(200);
    })
    test('when username is not registered in database, returns a 400 status and corresponding message', async () => {
        const response = await request.put('/user/1.0.0/tie').send({
            Username: 'userFalse'
        })
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No log in detected.");
    })
    test('1 Tie is added to and 1 Abandon subtracted from the database.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userGame_Tie', Password: 'passGame_Tie'}).send();
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.Ties).toEqual(1);
        expect(obj.Abandons).toEqual(50);            
    })
})

describe('userstats/1.0.0/gprank/:Username  -  Requesting the GP rank of the user', () => {
    test('correctly, returns 200 status and a json object with correct GP rank.', async () => {
        const response = await request.get('/userstats/1.0.0/gprank/:Username').query({Username: 'userGP_Rank'}).send();
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.row_num).toEqual(7);
    })
    test('when not logged in, returns a 400 status, corresponding message, and no user rank object.', async () => {
        const response = await request.get('/userstats/1.0.0/gprank/:Username').query({Username: ''}).send();
        expect(response.statusCode).toBe(400);
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No log in detected.");
        expect(r.data.length).toEqual(1);
    })
    test('when username is not in the database, returns a 400 status, corresponding message, and no user rank object.', async () => {
        const response = await request.get('/userstats/1.0.0/gprank/:Username').query({Username: 'userFalse'}).send();
        expect(response.statusCode).toBe(400);
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No log in detected.");
        expect(r.data.length).toEqual(1);
    })
})

describe('userstats/1.0.0/winsrank/:Username  -  Requesting the Wins rank of the user', () => {
    test('correctly, returns 200 status and a json object with correct Wins rank.', async () => {
        const response = await request.get('/userstats/1.0.0/winsrank/:Username').query({Username: 'userWins_Rank'}).send();
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.row_num).toEqual(5);
    })
    test('when not logged in, returns a 400 status, corresponding message, and no user rank object.', async () => {
        const response = await request.get('/userstats/1.0.0/winsrank/:Username').query({Username: ''}).send();
        expect(response.statusCode).toBe(400);
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No log in detected.");
        expect(r.data.length).toEqual(1);
    })
    test('when username is not in the database, returns a 400 status, corresponding message, and no user rank object.', async () => {
        const response = await request.get('/userstats/1.0.0/winsrank/:Username').query({Username: 'userFalse'}).send();
        expect(response.statusCode).toBe(400);
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No log in detected.");
        expect(r.data.length).toEqual(1);
    })
})

describe('userstats/1.0.0/winperrank/:Username  -  Requesting the Win Percentage rank of the user', () => {
    test('correctly, returns 200 status and a json object with correct Win Percentage rank.', async () => {
        const response = await request.get('/userstats/1.0.0/winperrank/:Username').query({Username: 'userWin%_Rank'}).send();
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.row_num).toEqual(3);
    })
    test('when not logged in, returns a 400 status, corresponding message, and no user rank object.', async () => {
        const response = await request.get('/userstats/1.0.0/winperrank/:Username').query({Username: ''}).send();
        expect(response.statusCode).toBe(400);
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No log in detected.");
        expect(r.data.length).toEqual(1);
    })
    test('when username is not in the database, returns a 400 status, corresponding message, and no user rank object.', async () => {
        const response = await request.get('/userstats/1.0.0/winperrank/:Username').query({Username: 'userFalse'}).send();
        expect(response.statusCode).toBe(400);
        let r = JSON.parse(response.text);
        let obj = r.data[0];
        expect(obj.msg).toEqual("No log in detected.");
        expect(r.data.length).toEqual(1);
    })
})

describe('userstats/1.0.0/leaderboard  -  Requesting leaderboard retrieval', () => {
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
        expect(obj1.length && obj2.length && obj3.length && obj4.length && obj5.length && obj6.length && obj7.length && obj8.length).toEqual(9);
        expect(obj1.Username).toEqual('userGP_Rank');
        expect(obj2.Username).toEqual('userGame_Tie');
        expect(obj3.Username).toEqual('userWin%_Rank');
        expect(obj4.Username).toEqual('userLogin');
        expect(obj5.Username).toEqual('userWins_Rank');
        expect(obj6.Username).toEqual('userGame_Win');
        expect(obj7.Username).toEqual('userGame_Start');
        expect(obj8.Username).toEqual('userCreate');
    })
    // test('returns 400 status when not connected to database', async () => {
    //     const response = await request.get('/userstats/1.0.0/leaderboard').send();
    //     expect(response.statusCode).toBe(400);
    // })    
})