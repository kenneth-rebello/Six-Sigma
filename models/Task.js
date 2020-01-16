const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    type:{
        type: String
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    order:[{
        designation: {
            type: String
        },
        position:{
            type: Number
        },
        deadline:{
            type: Number
        }
    }]
});

module.exports = Task = mongoose.model('task', taskSchema);