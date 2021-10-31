process.env.NODE_ENV = "test";
const app = require('../../apptest.js');
const supertest = require('supertest');
const request = supertest(app);
const dbFunction = require('../../testFunctions.js');
require('dotenv').config();

let addUsers = "INSERT INTO test_stats (Username, GP, Wins, Losses, Ties, Abandons, WinPerc, Password)" + 
                        "VALUES ('userLogin', 20, 5, 5, 5, 5, 33, 'passLogin');"

describe('user/1.0.0/:Username/:Password  -  Attempting to login as a user', () => {
    beforeAll(async () => {
        await dbFunction.setup(addUsers);    
    });

    afterAll(async () => {
        await dbFunction.breakdown();
    });

    test('correctly, returns a 200 status and a json object with user stats.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userLogin', Password: 'passLogin'}).send();
        expect(response.statusCode).toBe(200);
        expect(response.type).toEqual('application/json');
        let r = JSON.parse(response.text).data[0];
        expect([r.Username, r.GP, r.Wins, r.Losses, r.Ties, r.Abandons, r.WinPerc]).toEqual(['userLogin', 20, 5, 5, 5, 5, 33]);
    })
    test('with an incorrect password, returns a 400 status and corresponding message, with no user stats.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userLogin', Password: 'password'}).send();
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        expect(JSON.parse(response.text).data[0].msg).toEqual("Username and password do not match");
        expect(JSON.parse(response.text).data.length).toEqual(1);
    })
    test('with non-recorded username, returns a 400 status and corresponding message, with no user stats.', async () => {
        const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'userFalse', Password: 'passFalse'}).send();
        expect(response.statusCode).toBe(400);
        expect(response.type).toEqual('application/json');
        expect(JSON.parse(response.text).data[0].msg).toEqual("Username doesn't exist");
        expect(JSON.parse(response.text).data.length).toEqual(1);

    })
})