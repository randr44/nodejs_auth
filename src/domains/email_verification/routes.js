const express = require('express');
const router = express.Router();
const { sendVerificationOTPEmail } = require('./controller');
// request for new email verification

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) throw new Error('Email is required')
        const createdEmailVerificationOTP = await sendVerificationOTPEmail(email);
        res.status(200).json(createdEmailVerificationOTP);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
