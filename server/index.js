import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

// This is a body parser middleware that allows 
// your express application to receive json body in the request
app.use(express.json());

//register routes

app.use(userRoutes);


app.get('/', (req, res) => res.status(200).json({ message: 'Welcome to my TaskList API' }));

const port = process.env.PORT || 6010;

app.listen(port, () => console.log('Listening on port 6010'));

export default app;
