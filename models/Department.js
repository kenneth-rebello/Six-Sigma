const mongoose = require('mongoose');

const deptSchema = new mongoose.Schema({
    name:{
        type: String
    },
    supervisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = Dept = mongoose.model('department', deptSchema);