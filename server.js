const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const connectDB = require('./config/db');

const app = express();

app.use(bodyParser.json());

if(process.env.NODE_ENV === "production"){
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(compression());
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
    })
}

//Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/file', require('./routes/api/file'));

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT ,()=> console.log(`Server started on ${PORT}`) ); 

app.get('/service-worker.js', (req,res)=>{
    res.sendFile(path.resolve(__dirname, '..','build','service-worker.js'))
})