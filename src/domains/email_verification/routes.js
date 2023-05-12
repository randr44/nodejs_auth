const express = require('express');
const router = express.Router();
const { sendVerificationOTPEmail, verifyUserEmail } = require('./controller');

router.post('/verify', async (req, res) => {
    try {
        let { email, otp } = req.body;

        if (!(email && otp)) throw new Error('Empty OTP details are not allowed');

        await verifyUserEmail({ email, otp });
        res.status(200).json({ email, verified: true });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// request for new email verification
router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) throw new Error('An email is required')
        const createdEmailVerificationOTP = await sendVerificationOTPEmail(email);
        res.status(200).json(createdEmailVerificationOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
