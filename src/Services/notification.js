import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
async function sendEmail(name,email,Pmessage){
    try{
        const subject = name === 'Test User' ? 'No Birthday for Today' : `Happy Birthday: ${name}`;
        // console.log(`Email - ${process.env.EMAIL}`);
        // console.log(`Password- ${process.env.PASSWORD}`)
        const transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth:{
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            text: Pmessage,
        });
        console.info(`sent Successful to ${email}`);
    }
    catch(error){
        console.error('notification.js', error);
    };
};

export default sendEmail;