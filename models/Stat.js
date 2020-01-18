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
        },
        after:{
            type: Number
        },
        reassigned:{
            value: Number
        },
        misplaced:{
            value: Number
        }
    }]
});

module.exports = Stat = mongoose.model('stat',statSchema);