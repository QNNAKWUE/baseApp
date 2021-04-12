const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: "./config/config.env"});

const app = express();

//ROUTES
app.use('/api/message', require("./routes/message"));

const port = process.env.PORT || 6010;

app.listen(port, () => console.log('Listening on port 6010'));