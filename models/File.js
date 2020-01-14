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
    description:{
        type: String
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    created:{
        type: Date,
        default: new Date
    },
    location:{
        type: String
    },
    concluded:{
        type: Boolean,
        default: false    
    },
    overdue:{
        type: Boolean,
        default: false
    },
    file_task:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task'
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
            },
            done:{
                type: Boolean,
                default: false
            },
            owner:{
                type:Boolean,
                default: false
            },
            deadline:{
                type: Date
            },
            received:{
                type: Date
            },
            completed:{
                type: Date
            },
            dispatched:{
                type: Date
            },
            notes:{
                type: String
            },
            overdue:{
                type: Boolean,
                default: false
            }
        }
    ],
    illicit_scans:[{
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        scanned:{
            type: Date,
            default: new Date
        }
    }]
});

module.exports = File = mongoose.model('file',fileSchema);