const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    file_number: {
        type: String,
        required: true,
        unique: true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // List of previous owners ids
    history:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // Complete history of the file in terms of users
    lineage:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            position:{
                type: Number
            }
        }
    ]
});

module.exports = File = mongoose.model('file',fileSchema);