const express = require('express');

const server = express();
server.use(express.json())
const userRouter = require('./users/users-router')
// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here
server.use('/api/users', userRouter)


server.get('/', (req, res) => {
  res.json({message: 'reaching'});
});



module.exports = server;
