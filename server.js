const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db')

const app = express();

app.use(bodyParser.json());
app.use(express.json({extended: false}));

//Routes
app.use('/api/user', require('./routes/api/user'));

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT ,()=> console.log(`Server started on ${PORT}`) ); 