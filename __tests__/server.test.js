const app = require('../index.js');
const supertest = require('supertest');
const request = supertest(app);



// const userController = require('../controllers/user.js');

// login('login information relayed correctly', () =>{
//     expect(userController())
// })