import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';

import { notFound } from './middlewares/notFound';
import { errorHandlerMiddleware } from './middlewares/errorHandler';
import { stripePayment } from './controllers/stripeController';

//   wrap your asynchronous code in try/catch blocks to handle potential errors
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static('./public'));
app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.post('/stripe', stripePayment);
app.use(notFound);
app.use(errorHandlerMiddleware);

const server = http.createServer(app);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    server.listen(port, () => {
      console.log(`Server is listening on the port : ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
