let nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: process.env.SENDEMAILHOST,
        port: process.env.SENDEMAILPORT,
        secure: false,
        auth: {
            user: process.env.SENDEMAILUSER,
            pass: process.env.SENDEMAILPASS
        },tls: {
            rejectUnauthorized: false
        },
    });

    let mailOptions = {
        from: `Inventory <${process.env.SENDEMAILUSER}>`,
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return  await transporter.sendMail(mailOptions);

}
module.exports=SendEmailUtility;