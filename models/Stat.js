const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    record: [{
        month:{
            type: Date,
            default: new Date
        },
        value:{
            type: Number
        }
    }]
});

module.exports = Stat = mongoose.model('stat',statSchema);