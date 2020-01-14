const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const auth = require('../../middleware/auth');

const Report = require('../../models/Report');
const File = require('../../models/File');

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
        if(existing.length>0){
            return res.status(400).json({
                errors: [{msg: 'It looks like you have already reported this action, please await a response'}]
            })
        }
        if(supervisor._id==req.user || user._id==req.user || file.owner!=req.user){
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

router.get('/delete/:id', [auth], async(req,res)=>{
    try {
        
        const report = await Report.findById(req.params.id);

        if(report.supervisor!=req.user){
            return res.status(403).json({
                errors: [{msg: 'You are not authorized to perform this action'}]
            })
        }

        await Report.findOneAndDelete(req.params.id);

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
})

router.post('/record', [auth], async(req,res)=>{
    try {
        
        const { id, summary } = req.body;

        const report = await Report.findById(id);

        const file = await File.findById(report.file);

        if(!file.defaulters) file.defaulters = [];
        file.defaulters.push({
            user: report.against,
            summary: summary
        })

        await File.findOneAndUpdate({ _id: file._id }, { $set: file });
        await Report.findByIdAndDelete(id)

        const reports = await Report.find({supervisor:req.user});

        res,json(reports)
        
    } catch (err) {
        console.error(err.message);
        res.status(400).json({errors: [{msg: err.message}]});
    }
})

module.exports = router;