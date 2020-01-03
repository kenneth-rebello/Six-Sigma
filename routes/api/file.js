const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const File = require('../../models/File');

router.post('/new_file', [auth], async(req, res)=>{
    
    try {

        file = new File({
            file_number: req.body.fileNo,
            creator: req.user
        })

        await file.save();
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
})

module.exports = router;