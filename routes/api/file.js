const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const File = require('../../models/File');
const User = require('../../models/User');

router.get('/', [auth], async(req,res)=>{
    try {
        
        const files = await File.find()
            .populate('creator',['displayName'])
            .populate('owner',['displayName','email']);

        res.json(files);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
})

router.get('/one/:id', [auth], async(req, res)=>{

    try {
        
        const file = await File.findOne({_id: req.params.id})
        .populate('creator',['displayName','email'])
        .populate('owner',['displayName','email'])
        .populate('lineage.user',['displayName', 'email', 'designation'])
        .populate('illicit_scans.user',['displayName']);

        res.json(file)

    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }

});

router.get('/own', [auth], async(req,res)=>{
    try{

        const files = await File.find({owner: req.user})
        .populate('creator',['displayName','email'])
        .populate('owner',['displayName','email'])
        .populate('lineage.user',['displayName', 'email']);

        res.json(files)

    }catch(err){
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
})


router.get('/assigned', [auth], async(req,res)=>{
    try{

        const files = await File.find({creator: req.user})
        .populate('creator',['displayName','email'])
        .populate('owner',['displayName','email'])
        .populate('lineage.user',['displayName', 'email']);

        res.json(files)

    }catch(err){
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
});

router.get('/upcoming', [auth], async(req, res)=>{
    try {
        
        const user = await User.findById(req.user);
        const ids = user.upcoming;

        const files = await File.find({_id: {$in: ids}})
        .populate('creator',['displayName','email'])
        .populate('owner',['displayName','email'])
        .populate('lineage.user',['displayName', 'email']);

        res.json(files)

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
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
        res.status(400).json({errors: [{msg: err.message}]});
    }
    
});

router.post('/edit', [auth], async(req,res)=>{
    try {
        
        const file = await File.findById(req.body.id);

        if(file.creator!=req.user){
            res.status(403),json({
                errors: [{msg: 'Sorry, you are not authorized to edit this file'}]
            })
        }

        let newLineage = [];
        let old = file.lineage;

        req.body.lineage.map(point => {
            let index = point.user.position;
            if(old[index]){
                if(!old[index].done){
                    newLineage[index] = {
                        user: point.user ? point.user.value : old[index].user,
                        notes: point.notes ? point.notes : old[index].notes,
                        deadline: point.deadline ? point.deadline : old[index].deadline
                    }
                   
                }
            }else{
                newLineage[index] = {             
                    user: point.user ? point.user.value : undefined,
                    notes: point.notes ? point.notes : undefined,
                    deadline: point.deadline ? point.deadline : undefined
                }        
            }
        });

        file.lineage = newLineage;

        const updated = await File.findOneAndUpdate({_id: file._id}, { $set: file}, {new:true});

        res.json(updated);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
});


router.post('/scan', [auth], async(req,res)=>{
    try {
        
        const file = await File.findOne({file_number: req.body.name});

        let fileCopy = file;

        if(file.owner==req.user){
            return res.status(400).json({
                errors: [{msg: 'You already own this file'}],
                id: file.id
            });
        }

        let inPath = false
        let index = -1
        file.lineage.every((point, idx) => {
            if(point.user==req.user && !point.done){
                inPath = true
                index = idx
                return false;
            }
            return true
        });

        const prev = file.lineage[index-1]

        if(prev){
            if(!prev.owner){
                if(!fileCopy.illicit_scans) fileCopy.illicit_scans = [];
                fileCopy.illicit_scans.push({
                    user: req.user
                });
                await File.findOneAndUpdate({file_number: file.file_number}, { $set: fileCopy });
                return res.status(400).json({
                    errors: [{
                        msg: 'The previous user must receive this file before you, this scan will be recorded for security reasons, please send back the file.',
                    }],
                    id: file.id
                });
            }else{
                if(index!==-1)file.lineage[index-1].owner = false
            }
    
            if(!prev.done){
                return res.status(400).json({
                    errors: [{
                        msg: 'The previous user must mark this file done before you, this scan will not be recorded, please ask previous user to mark their work complete.',
                    }],
                    id: fileCopy.id
                });
            }
        }

        if(!inPath){
            if(!fileCopy.illicit_scans) fileCopy.illicit_scans = [];
            fileCopy.illicit_scans.push({user: req.user});
            await File.findOneAndUpdate({file_number: fileCopy.file_number}, { $set: fileCopy });
            return res.status(401).json({
                errors: [{
                    msg: 'Sorry you are not authorized to posess this file, if you do kindly return it, this scan is recorded for security reasons'
                }],
                id: fileCopy.id
            });
        }

        file.lineage.every((point) => {
            if(point.user==req.user && !point.done){
                point.owner = true,
                point.received = new Date
                return false;
            }
            return true
        });

        file.owner = req.user;
    
        const updated = await File.findOneAndUpdate({file_number: file.file_number}, { $set: file}, {new:true});

        const nextUser = await User.findOne(file.lineage[index+1].user);
        const user = await User.findOne(file.lineage[index].user);

        if(!nextUser.upcoming) nextUser.upcoming = [];
        nextUser.upcoming.push(file._id);

        await User.findOneAndUpdate({_id: nextUser._id}, {$set: nextUser});
        
        if(user.upcoming) user.upcoming.splice(user.upcoming.indexOf(file._id), 1);
        await User.findOneAndUpdate({_id: user._id}, {$set: user});


        res.json(updated)

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
});


router.post('/done', [auth], async(req,res)=>{
    try {

        const file = await File.findById(req.body.id);

        file.lineage.every((point) => {
            if(point.user==req.user && point.owner && !point.done){
                point.completed = new Date
                point.done = true
                return false;
            }
            return true
        });

        const updated = await File.findOneAndUpdate({file_number: file.file_number}, { $set: file}, {new:true});

        res.json(updated)

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
});

module.exports = router;