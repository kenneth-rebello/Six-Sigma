const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title:{
        type: String
    },
    order:[{
        designation: {
            type: String
        },
        position:{
            type: Number
        }
    }]
});

module.exports = Task = mongoose.model('task', taskSchema);