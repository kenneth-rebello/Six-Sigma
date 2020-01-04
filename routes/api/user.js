const express = require('express');
const router = express.Router();

const User = require('../../models/User');

router.post('/', async(req, res)=>{

    const { email, displayName, photoURL } = req.body;

    try {

        let user =  await User.findOne({email});

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
        res.status(500).send('Server Error');
    }

})

router.get('/all', async (req, res)=>{

    try {

        const users = await User.find();
        
        res.json(users)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

router.get('/supervisors', async (req, res)=>{

    try {

        const users = await User.find();
        
        res.json(users)
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

module.exports = router;