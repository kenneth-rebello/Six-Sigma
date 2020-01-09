const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const compression = require('compression');
const enforce = require('express-sslify');
const connectDB = require('./config/db');

const app = express();

app.use(enforce.HTTPS({trustProtoHeader: true}))
app.use(bodyParser.json());
app.use(express.json({extended: false}));
app.use(methodOverride('_method'));
app.use(cors());

if(process.env.NODE_ENV === "production"){
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