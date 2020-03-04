// server.js
console.log(`Your token is ${process.env.token}`); // undefined
const dotenv = require('dotenv');
dotenv.config();
console.log(`Your token is ${process.env.token}`); // Ok