const mongoose = require('mongoose');

const deptSchema = new mongoose.Schema({
    name:{
        type: String
    }
});

module.exports = Dept = mongoose.model('department', deptSchema);