import express from 'express';
import dotenv from 'dotenv';

dotenv.config({path: "./config/config.env"});

const app = express();

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Welcome to my TaskList API' });
  });

const port = process.env.PORT || 6010;

app.listen(port, () => console.log('Listening on port 6010'));