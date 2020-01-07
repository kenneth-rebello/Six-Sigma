const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const File = require('../../models/File');

router.get('/', [auth], async(req,res)=>{
    try {
        
        const files = await File.find()
            .populate('creator',['displayName'])
            .populate('owner',['displayName','email']);

        res.json(files);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.get('/one/:id', [auth], async(req, res)=>{

    try {
        
        const file = await File.findOne({_id: req.params.id})
        .populate('creator',['displayName','email'])
        .populate('owner',['displayName','email'])
        .populate('lineage.user',['displayName', 'email']);

        res.json(file)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


router.post('/new_file', [auth], async(req, res)=>{
    
    try {
        
        let lineage = [];
        req.body.path.map(path => {
            lineage[path.position] = {
                position: path.position,
                user: path.value,
                notes: path.notes
            }
        });

        file = new File({
            file_number: req.body.file_number,
            description: req.body.description,
            creator: req.user,
            lineage,
            name: req.body.name ? req.body.name : undefined
        })

        await file.save();
        file = await File.findOne({_id:file._id}).populate('creator','user');
        res.json(file)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
    
});



router.post('/scan', [auth], async(req,res)=>{
    try {
        
        const file = await File.findOne({file_number: req.body.name});

        if(file.owner==req.user){
            return res.status(400).json({
                errors: [{msg: 'You already own this file'}]
            });
        }

        let inPath = false
        let index = -1
        file.lineage.forEach((point, idx) => {
            if(point.user==req.user){
                inPath = true
                point.owner = true,
                point.received = Date.now()
            }
        });

        if(!inPath){
            return res.status(401).json({
                errors: [{msg: 'Sorry you are not authorized to posess this file, if you do kindly return it'}]
            });
        }else{
            file.owner = req.user
        }

        const updated = await File.findOneAndUpdate({file_number: file.file_number}, { $set: file}, {new:true});

        res.json(updated)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;