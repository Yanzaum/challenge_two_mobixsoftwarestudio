import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Routes from './routes/api';

dotenv.config();

const PORT = process.env['PORT'];

const USERNAME = process.env['usernameDB'];
const PASSWORD = process.env['passwordDB'];
const CLUSTER = process.env['clusterDB'];
const DBNAME = process.env['nameDB'];

const server = express();

mongoose.connect(`mongodb+srv://${USERNAME}:${PASSWORD}@${CLUSTER}.mongodb.net/${DBNAME}?retryWrites=true&w=majority`);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

server.use('/api', Routes);

server.use((req: Request, res: Response) => {
  res.status(404);
  res.json({error: 'Endpoint não encontrado.'});
});

server.listen(PORT);
