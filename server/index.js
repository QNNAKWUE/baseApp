import express from 'express';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import bodyParser from 'body-parser';
import userRoutes from './routes/UserRoutes';
import ListRoutes from './routes/ListRoutes';

//Load config
dotenv.config({path: "./config/config.env"});

connectDB();

const app = express();

// This is a body parser middleware that allows
// your express application to receive json body in the request
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))

// register routes

app.use(userRoutes);
app.use(ListRoutes);

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to my TaskList API' }));

const port = process.env.PORT || 6010;

app.listen(port, () => console.log('Listening on port 6010'));

export default app;
