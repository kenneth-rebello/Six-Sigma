const schedule = require('node-schedule');
const nodemailer = require('nodemailer'); 
const User = require('../models/User'); 
const File = require('../models/File');
const Delay = require('../models/Delay');
const Stat = require('../models/Stat');

const X = schedule.scheduleJob('00 00 * * *', async () => {
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
        }else{
            file.overdue = false
            user.overdue = false
            return false
        }
        return true
    })

    await File.findOneAndUpdate({_id:file._id}, {$set: file})

    if(delay){

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

const Day = schedule.scheduleJob('00 00 * * *', async () => {
    const users = await User.find();

    users.forEach(async user => {
        user.record.yesterday = user.record.today
        user.record.today = 0
        await User.findByIdAndUpdate(user._id, {$set: user});
    })
})

module.exports.updateDaily = Day

const Week = schedule.scheduleJob('00 00 * * 7', async () => {
    const users = await User.find();

    users.forEach(async user => {
        user.record.this_week = 0;
        await User.findByIdAndUpdate(user._id, {$set: user});
    })
})

module.exports.updateWeekly = Week

const Month = schedule.scheduleJob('15 15 * * *', async () => {
    const users = await User.find();

    users.forEach(async user => {
        let stats = await Stat.findOne({user: user._id});
        if(stats){
            stats.record.push({value: user.record.this_month});
            await Stat.findByIdAndUpdate(stats.id, {$set: stats});
        }else{
            stats = new Stat({
                user: user._id,
                record: [
                    {
                        value: user.record.this_month,
                        month: (new Date).getMonth(),
                        year: (new Date).getFullYear() 
                    }
                ]
            });
            await stats.save();
        }

        user.record.this_month = 0;
        await User.findByIdAndUpdate(user._id, {$set: user});
    })
})

module.exports.updateMonthly = Month

const Year = schedule.scheduleJob('00 00 1 1 *', async () => {
    const users = await User.find();

    users.forEach(async user => {
        user.record.this_year = 0;
        await User.findByIdAndUpdate(user._id, {$set: user});
    })
})

module.exports.updateYearly = Year









// const Dummy = schedule.scheduleJob('31 17 * * *', async () => {
//     const users = await User.find();

//     let years = [2019, 2018]

//     users.forEach(async user => {
    
//         let tempRecord = []

//         years.forEach(year => {
//             for(var i=0; i<12; i++){
//                 let rValue = Math.floor((Math.random() * 200) + 300);
//                 tempRecord.push({
//                     month: i,
//                     year: year,
//                     value:rValue
//                 })
//             }
//         })
        
//         stats = new Stat({
//             user: user._id,
//             record: tempRecord
//         });
//         await stats.save();

//         console.log(user.displayName);
//     });

//     console.log('Done')
// })

// module.exports.generateDummy = Dummy