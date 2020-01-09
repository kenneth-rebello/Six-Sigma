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
        res.status(500).json({errors: [{msg: err.message}]});
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

router.get('/own', [auth], async(req,res)=>{
    try{

        const files = await File.find({owner: req.user})
        .populate('creator',['displayName','email'])
        .populate('owner',['displayName','email'])
        .populate('lineage.user',['displayName', 'email']);

        res.json(files)

    }catch{
        console.error(err.message);
        res.status(500).json({errors: [{msg: err.message}]});
    }
})


router.post('/new_file', [auth], async(req, res)=>{
    
    try {
        
        let lineage = [];
        req.body.path.map(path => {
            lineage[path.position] = {
                position: path.position,
                user: path.value,
                notes: path.notes,
                deadline: path.deadline
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
        res.status(500).json({errors: [{msg: err.message}]});
    }
    
});



router.post('/scan', [auth], async(req,res)=>{
    try {
        
        const file = await File.findOne({file_number: req.body.name});

        if(file.owner==req.user){
            return res.status(400).json({
                errors: [{msg: 'You already own this file'}],
                id: file.id
            });
        }

        let inPath = false
        let index = -1
        file.lineage.every((point, idx) => {
            if(point.user==req.user && point.owner && !point.done){
                inPath = true
                point.owner = true,
                point.received = Date.now()
                index = idx
                return false;
            }
            return true
        });

        const prev = file.lineage[index-1]

        if(prev){
            if(!prev.owner){
                return res.status(400).json({
                    errors: [{
                        msg: 'The previous user must receive this file before you, this scan will not be recorded, please send back the file.',
                    }],
                    id: file.id
                });
            }
    
            if(!prev.done){
                return res.status(400).json({
                    errors: [{
                        msg: 'The previous user must mark this file done before you, this scan will not be recorded, please ask previous user to mark their work complete.',
                    }],
                    id: file.id
                });
            }
        }

        if(!inPath){
            return res.status(401).json({
                errors: [{
                    msg: 'Sorry you are not authorized to posess this file, if you do kindly return it, this scan is recorded for security reasons'
                }],
                id: file.id
            });
        }else{
            file.owner = req.user
        }

        const updated = await File.findOneAndUpdate({file_number: file.file_number}, { $set: file}, {new:true});

        res.json(updated)

    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors: [{msg: err.message}]});
    }
});

module.exports = router;