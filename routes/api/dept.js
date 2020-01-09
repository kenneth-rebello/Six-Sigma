const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Dept = require('../../models/Department');

router.get('/', async(req,res)=>{
    try {
        
        const depts = await Dept.find();

        res.json(depts)

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
})

module.exports = router;