const OTP = require('./model');
const generateOTP = require('./../../util/generateOTP');
const sendEmail = require('./../../util/sendEmail');
const { hashData } = require('./../../util/hashData');
const { AUTH_EMAIL } = process.env;

const sendOTP = async ({email, subject, message, duration = 1}) => {
    try {
        if (!(email && subject && message)) {
            throw Error('Provide values for email, subject, message');
        }

        // clear any old records
        await OTP.deleteOne({email});

        // generate new otp
        const generatedOTP = await generateOTP();

        // send otp to email
        const mailOptions = {
            from: AUTH_EMAIL,
            to: email,
            subject,
            html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"><b>${generatedOTP}</b></p><p>This code <b>expires in ${duration} hour(s)</b></p>`,
        };
        await sendEmail(mailOptions);

        // save otp to db
        const hashedOTP = await hashData(generatedOTP);
        const newOTP = await new OTP({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 * +duration,
        })

        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;
    } catch (error) {
        throw error;
    }
}

module.exports = { sendOTP };