const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type:  String,
        required: true,
        unique: true
    },
    displayName: {
        type: String
    },
    picture:{
        type: String
    },
    registered:{
        type: Boolean,
        default: false
    },
    emp_code:{
        type: String,
        unique: true
    },
    designation:{
        type: String
    },
    clearance:{
        type: Number
    },
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department'
    },
    supervisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    upcoming:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'file'
    }],
    completed:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'file'
    }],
    avg_comp_time:{
        type: Number
    },
    language:{
        type: String,
        default: "English"
    },
    record:{
        today:{
            type: Number,
            default: 0
        },
        yesterday:{
            type: Number,
            default: 0
        },
        this_week:{
            type: Number,
            default: 0
        },
        this_month:{
            type: Number,
            default: 0
        },
        this_year:{
            type: Number,
            default: 0
        },
        all_time:{
            type: Number,
            default: 0
        }
    }
});

module.exports = User = mongoose.model('user',userSchema);