require('dotenv').config();

const Server = require('./src/server/server');

const server = new Server();

server.listen();

// El servidor lo iniciamos con npx nodemon app.js
