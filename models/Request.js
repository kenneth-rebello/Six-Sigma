const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    title:{
        type: String
    },
    text:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    supervisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    new_deadline:{
        type: Date
    },
    old_deadline:{
        type: Date,
    },
    file:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'file'
    },
    requested_on:{
        type: Date,
        default: new Date
    }
});

module.exports = Request = mongoose.model('request', requestSchema);