const mongoose = require('mongoose');

const delaySchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    supervisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    file:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'file'
    },
    duration:{
        type: Number,
        required: true
    },
    seen:{
        type: Boolean,
        default: false
    }
});

module.exports = Delay = mongoose.model('delay', delaySchema);