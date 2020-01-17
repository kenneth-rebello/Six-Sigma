const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.post('/', async(req, res)=>{

    const { email, displayName, photoURL } = req.body;

    try {

        let user =  await User.findOne({email})
        .populate('supervisor','displayName')
        .populate('department', 'name');

        if(!user){
            
            user = new User({
                email,
                displayName,
                picture: photoURL
            })

            await user.save();
        }

        return res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }

})

router.get('/all', async (req, res)=>{

    try {

        const users = await User.find({registered:true})
        .populate('department','name');
        
        res.json(users)
        
    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }

})

router.get('/supervisors', async (req, res)=>{

    try {

        const users = await User.find({designation:'Position S'});
        
        res.json(users)
        
    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }

});

router.post('/designation', async (req, res)=>{
    try {
        
        const users = await User.find({designation:req.body.designation});

        res.json(users)

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
});

router.post('/register', [auth], async(req,res)=>{
    try {
        
        const user = await User.findById(req.user);
    
        if(!user){
            return res.status(400).json({
                errors: [{msg: 'User was not found, please try again'}]
            });
        }
        
        const { position, displayName, emp_code, supervisor, department } = req.body;

        let toUpdate = {};

        if(position) toUpdate.position = position.value;
        if(displayName) toUpdate.displayName = displayName;
        if(emp_code) toUpdate.emp_code = emp_code;
        if(supervisor) toUpdate.supervisor = supervisor.value;
        if(department) toUpdate.department = department.value;
        toUpdate.registered = true

        const updated = await User.findOneAndUpdate({_id: req.user}, { $set: toUpdate}, {new:true});

        res.json(updated);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
})

router.get('/language/:lang', [auth], async(req,res)=>{
    try {
        
        const user = await User.findByIdAndUpdate(req.user, {$set: {language: req.params.lang}}, {new: true})
        .populate('supervisor','displayName')
        .populate('department', 'name');

        return res.json(user)

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
});

router.get('/stats/:id', async(req, res)=>{
    try {
        
        const stats = await Stat.find({user: req.params.id})
        .populate('user',['displayName']);

        return res.json(stats);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
});

router.get('/ideal/:dsgn/:date', async(req, res)=>{
    try {
    
        let users = await User.find({designation:req.params.dsgn}).select(['_id', 'upcoming','displayName']);
        
        users.sort((a,b)=>{
            return a.upcoming.length - b.upcoming.length
        })
        let user = users[0];

        res.json({
            user,
            deadline: req.params.date
        })

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
})

module.exports = router;