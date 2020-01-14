const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const auth = require('../../middleware/auth');

const Request = require('../../models/Request');

router.get('/', [auth], async(req, res)=>{
    try {
        
        const requests = await Request.find({supervisor:req.user, accepted:false})
        .populate('user',['displayName','designation'])
        .populate('supervisor',['displayName','designation'])
        .populate('file',['file_number']);

        res.json(requests);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
});

router.get('/user', [auth], async(req, res)=>{
    try {
        
        const requests = await Request.find({user:req.user})
        .populate('user',['displayName','designation'])
        .populate('supervisor',['displayName','designation'])
        .populate('file',['file_number']);

        res.json(requests);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
});


router.post('/', [auth], async(req, res)=>{
    try {
        const {new_date, old_date, file, supervisor, user, message } = req.body;

        let existing = await Request.find({user: req.user, supervisor: supervisor._id});
        if(existing.length>0){
            return res.status(400).json({
                errors: [{msg: 'It looks like you have already submitted a request, please await a response'}]
            })
        }
        if(supervisor._id==req.user || req.user!=user._id){
            return res.status(400).json({
                errors: [{msg: 'This action is not possible'}]
            })
        }
        
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'sixsigmasih',
                pass: '6sigmasih'
            },
            tls: {rejectUnauthorized: false}
        });

        let mailOptions = {
            from: 'sixsigmasih@gmail.com',
            to: supervisor.email,
            subject: `Request for deadline extension by ${user.displayName} for file ${file.number}`,
            text: message,
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if(error){
                console.log('Did not send: '+error)
                return res.status(400).json({
                    errors: [{msg: 'Sorry, there was an error in logging your request, please try again'}]
                })
            }else{
                console.log('Email sent: '+info.response);

                let report = new Request({
                    text: message,
                    title: `Request for deadline extension by ${user.displayName} for file ${file.number}`,
                    user: req.user,
                    supervisor: supervisor._id,
                    old_deadline: old_date,
                    new_deadline: new_date,
                    file: file.id
                })

                await report.save();
            }
            transporter.close();
        })

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
});


router.get('/grant/:id', [auth], async(req,res)=>{
    try {
        
        await Request.findByIdAndUpdate( req.params.id, {$set: {accepted: true}});

        const requests = await Request.find({supervisor:req.user, accepted:false})
        .populate('user',['displayName','designation'])
        .populate('supervisor',['displayName','designation'])
        .populate('file',['file_number']);

        res.json(requests);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
});


router.get('/delete/:id', [auth], async(req,res)=>{
    try {
        
        const request = await Request.findById(req.params.id);

        if(request.supervisor!=req.user && request.user!=req.user ){
            return res.status(403).json({
                errors: [{msg: 'You are not authorized to perform this action'}]
            })
        }

        await Request.findOneAndDelete(req.params.id);

        let requests = []
        if(request.supervisor==req.user){

            requests = await Request.find({supervisor:req.user, accepted:false})
            .populate('user',['displayName','designation'])
            .populate('supervisor',['displayName','designation'])
            .populate('file',['file_number']);

        }else if(request.user==req.user){
            requests = await Request.find({user:req.user})
            .populate('user',['displayName','designation'])
            .populate('supervisor',['displayName','designation'])
            .populate('file',['file_number']);
        }

        res.json(requests);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
})

module.exports = router;