import dotenv from 'dotenv';
dotenv.config();

import Server from "./src/server/server.js";

const server = new Server();

server.listen();
