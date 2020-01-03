const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

connectDB = () => {
    try{
        mongoose.connect(db,{
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
        });
    
        const conn = mongoose.connection;
        conn.on('open',() => {
            console.log('MongoDB Connected');
        });
    
    }catch(err){
        console.error(err.message);
        //EXIT PROCESS WITH FAILURE
        process.exit(1);
    }
}

module.exports = connectDB;