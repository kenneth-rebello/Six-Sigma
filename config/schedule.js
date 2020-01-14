const schedule = require('node-schedule');
const nodemailer = require('nodemailer'); 
const File = require('../models/File');
const Delay = require('../models/Delay');

const X = schedule.scheduleJob('56 14 * * *', async () => {
  const files = await File.find({concluded:false})
  .populate('creator',['displayName','email'])
  .populate('owner',['displayName','email']);

  files.forEach(async file => {
    let duration = 0;
    let delay = false;
    file.lineage.every( user => {
        if(user.owner && !user.done && user.deadline < new Date){
            file.overdue = true
            user.overdue = true     
            delay = true
            duration = (new Date).getDate() - user.deadline.getDate();
            return false
        }
        return true
    })

    if(delay){
        await File.findOneAndUpdate({_id:file._id}, {$set: file})

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
            to: file.owner.email,
            subject: `Warning, you have missed the deadline for file ${file.file_number}`,
            text: `This is to inform you that you have crossed the stipulated deadline for 
            file number ${file.file_number} by ${duration} days. Please complete the job at 
            the earliest and intimate ${file.creator.displayName} about the same.
            This delay will be recorded for statistics and supervisor ${file.creator.displayName} 
            will also receive an email regarding the delay.`,
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if(error){
                console.log('Did not send: '+error)
            }else{
                console.log('Email sent: '+info.response);
            }
            transporter.close();
        })

        mailOptions = {
            from: 'sixsigmasih@gmail.com',
            to: file.creator.email,
            subject: `Warning, ${file.owner.displayName} has missed the deadline for file ${file.file_number}`,
            text: `This is to inform you that ${file.owner.displayName} has crossed the stipulated deadline for 
            file number ${file.file_number} by ${duration} days. Please ensure the job is completed at the earliest.`
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if(error){
                console.log('Did not send: '+error)
            }else{
                console.log('Email sent: '+info.response);

                let report = new Delay({
                    user: file.owner._id,
                    supervisor: file.creator._id,
                    file: file._id,
                    duration: duration
                })

                await report.save();
            }
            transporter.close();
        })
    }
  })
    
});

module.exports.checkDeadline = X
