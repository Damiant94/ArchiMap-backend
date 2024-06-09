require("dotenv").config();
import express, { Express, Request, Response } from "express";
import http from "http"

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});