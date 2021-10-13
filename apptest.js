const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));

app.use(express.json());

const user = require('./routes/user.js');
app.use('/user', user);



// app.post('/test', async (req, res) => {
//     return res.status(200).json({message: 'Pass!'});
// });

module.exports = app;