const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const auth = require('../../middleware/auth');

const Report = require('../../models/Report');

router.get('/', [auth], async(req, res)=>{
    try {
        
        const reports = await Report.find({supervisor:req.user})
        .populate('issuer',['displayName','designation'])
        .populate('supervisor',['displayName','designation'])
        .populate('against',['displayName','designation'])
        .populate('file',['file_number']);

        res.json(reports);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
});


router.post('/', [auth], async(req, res)=>{
    try {
        const {supervisor, file, user, message } = req.body;

        let existing = await Report.find({issuer: req.user, supervisor: supervisor._id});
        if(existing){
            return res.status(400).json({
                errors: [{msg: 'It looks like you have already reported this action, please await a response'}]
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
            subject: `Report against ${user.displayName} for file ${file.number}`,
            text: message,
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if(error){
                console.log('Did not send: '+error)
                return res.status(400).json({
                    errors: [{msg: 'Sorry, there was an error in logging your report, please try again'}]
                })
            }else{
                console.log('Email sent: '+info.response);

                let report = new Report({
                    text: message,
                    title: `Report against ${user.displayName} for file ${file.number}`,
                    issuer: req.user,
                    supervisor: supervisor._id,
                    against: user._id,
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

module.exports = router;