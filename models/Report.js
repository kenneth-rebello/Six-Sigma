const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    title:{
        type: String
    },
    text:{
        type: String
    },
    issuer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    supervisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    against:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    file:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'file'
    },
    reported_on:{
        type: Date,
        default: new Date
    }
});

module.exports = Report = mongoose.model('report', reportSchema);