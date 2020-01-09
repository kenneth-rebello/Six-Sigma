const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.post('/', async(req, res)=>{

    const { email, displayName, photoURL } = req.body;

    try {

        let user =  await User.findOne({email}).populate('supervisor','displayName');

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

        const users = await User.find();
        
        res.json(users)
        
    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }

})

router.get('/supervisors', async (req, res)=>{

    try {

        const users = await User.find();
        
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
        
        //TO DO - add code for department
        const { position, displayName, emp_code, supervisor, department } = req.body;

        let toUpdate = {};

        if(position) toUpdate.position = position;
        if(displayName) toUpdate.displayName = displayName;
        if(emp_code) toUpdate.emp_code = emp_code;
        if(supervisor) toUpdate.supervisor = supervisor.value;
        if(department) toUpdate.department = department;

        if(emp_code && supervisor && position) toUpdate.registered = true

        const updated = await User.findOneAndUpdate({_id: req.user}, { $set: toUpdate}, {new:true});

        res.json(updated);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
})

module.exports = router;