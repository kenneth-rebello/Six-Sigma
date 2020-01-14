const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const connectDB = require('./config/db');

const Schedule = require('./config/schedule');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

if(process.env.NODE_ENV === "production"){
    app.use(compression());
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
    })
}

//Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/file', require('./routes/api/file'));
app.use('/api/dept', require('./routes/api/dept'));
app.use('/api/report', require('./routes/api/report'));
app.use('/api/request', require('./routes/api/request'));

connectDB();

Schedule.checkDeadline;
Schedule.updateDaily;
Schedule.updateMonthly;
Schedule.updateWeekly;
Schedule.updateYearly;

const PORT = process.env.PORT || 5000;

app.listen(PORT ,()=> console.log(`Server started on ${PORT}`) ); 

app.get('/service-worker.js', (req,res)=>{
    res.sendFile(path.resolve(__dirname, '..','build','service-worker.js'))
})