const http = require('http');
const express = require ('express');
require("dotenv").config();

const app = express();
const port = process.env.PORT;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});