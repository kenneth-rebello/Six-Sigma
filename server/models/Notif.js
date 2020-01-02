const mongoose = require('mongoose');

const notifSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tray: [
        {
            text:{
                type: String
            },
            date:{
                type: Date,
                default: Date.now()
            }
        }
    ]
});

module.exports = Notif = mongoose.model('notif',notifSchema);