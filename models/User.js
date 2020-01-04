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
    // Unique employee identification number
    emp_code:{
        type: String,
        unique: true
    },
    // Employees position in the organisation
    position:{
        type: String
    },
    // The level of clearance/authorization of the user : Higher levels have access to more data
    clearance:{
        type: Number
    },
    // Referring to the department id in the database
    department:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dept'
    },
    // Referring to the user who is the direct supervisor of the user
    supervisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    // Array of file ids 
    current_files:[
        {
            file:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'file'
            }
        }
    ],
    latest_files:[
        {
            file:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'file'
            }
        }
    ],
    // Average completion time of file passing on ( receving to confirmation )
    avg_comp_time:{
        type: Number
    },
    record:{
        today:{
            type: Number
        },
        yesterday:{
            type: Number
        },
        past_week:{
            type: Number
        },
        past_month:{
            type: Number
        },
        past_quarter:{
            type: Number
        },
        past_year:{
            type: Number
        },
        all_time:{
            type: Number
        }
    }
});

module.exports = User = mongoose.model('user',userSchema);