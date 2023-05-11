const User = require('../user/model');
const { sendOTP } = require('./../otp/controller');
const sendVerificationOTPEmail = async (email) => {
    try {
        // check if an account exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw Error('No account found with this email');
        }
        const otpDetails = {
            email,
            subject: 'Email Verification',
            message: 'Verify your email with the code below.',
            duration: 1
        }
        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
    } catch (error) {
        throw error;
    }
}

module.exports = { sendVerificationOTPEmail };