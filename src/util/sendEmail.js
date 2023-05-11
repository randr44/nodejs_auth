const nodemailer = require('nodemailer');
const { AUTH_EMAIL, EMAIL_SERVICE_PASS } = process.env;


let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: AUTH_EMAIL,
        pass: EMAIL_SERVICE_PASS
    }
});

// test transporter
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

const sendEmail = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        return
    } catch (error) {
        throw error;
    }
}

module.exports = sendEmail;