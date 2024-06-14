require("dotenv").config();
import express, { Express, Request, Response, NextFunction } from "express";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
// import multer from "multer";

import feedRoutes from "./routes/feed";
// import authRoutes from "./routes/auth";

const app: Express = express();
const port = process.env.PORT;


app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = process.env.NODE_ENV === "production" ? "https://archimap-frontend.onrender.com" : "*";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.haa8v.mongodb.net/ArchiMap?retryWrites=true&w=majority`
  )
  .then((result) => {
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
