const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    record: [{
        month:{
            type: Number
        },
        year:{
            type: Number
        },
        value:{
            type: Number
        }
    }]
});

module.exports = Stat = mongoose.model('stat',statSchema);