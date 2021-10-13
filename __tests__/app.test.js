//process.env.NODE_ENV = "test";
const app = require('../apptest.js');
const supertest = require('supertest');
const request = supertest(app);

describe('Create User /user/1.0.0/create', () => {

    describe('correct unique username and password', () => {
        test('200 status when sufficient username and password', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'username',
                Password: 'password'
            })
            expect(response.statusCode).toBe(200);
        })
        test('checks to see if test user - username - was added to database', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'username',
                Password: 'password'
            })
            expect(response.statusCode).toBe(400);
        })
        test('the returned content type is JSON', async () => {
            const response = await request.post('/user/1.0.0/create').send({
                Username: 'username',
                Password: 'password'
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })
    })

    describe('insufficient or not unique username and password', () => {
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
})

describe('Login /user/1.0.0/:Username/:Password', () => {

    describe('correct username/password combination', () => {
        test('200 status when correct username/password combination', async () => {
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'Harbour Dog', Password: 'rangers1'}).send();
            expect(response.statusCode).toBe(200);
        })
        test('User object retrieved on login', async () => {//not currently parsing object properly
            const response = await request.get('/user/1.0.0/:Username/:Password').query({Username: 'Harbour Dog', Password: 'rangers1'}).send();
            console.log(response.res.text.data);
            expect(response.res.text.data.ID).toBe(175);
        })
    })

    describe('incorrect username/password combination', () => {
        //400 status?
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