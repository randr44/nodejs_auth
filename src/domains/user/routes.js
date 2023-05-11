// localhost:5000/api/v1/user/signup working with postman
const express = require('express');
const router = express.Router();
const { createNewUser, authenticateUser } = require('./controller');
const auth = require('./../../middleware/auth');

//protected route
router.get('/private_data', auth, (req, res) => {
    res
        .status(200)
        .send(`Your in the private territory of ${req.currentUser.email}`)
});

// signin
router.post('/', async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email ? email.trim() : '';
        password = password ? password.trim() : '';

        if (!(email && password)) {
            throw Error('Empty credentials supplied!');
        }

        const authenticatedUser = await authenticateUser({ email, password });
        res.status(200).json(authenticatedUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});
// signup
router.post('/signup', async (req, res) => {
 try {
     let { name, email, password } = req.body;
     name = name ? name.trim() : '';
     email = email ? email.trim() : '';
     password = password ? password.trim() : '';

     if (!(name && email && password)) {
         throw Error('Empty input fields!');
     } else if (!/^[a-zA-Z ]*$/.test(name)) {
         throw Error('Invalid name entered!');
     } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
         throw Error('Invalid email entered!');
     } else if (password.length < 8) {
         throw Error('Password is too short!');
     } else {
         // good credentials
         const newUser = await createNewUser({ name, email, password });
         res.status(200).json(newUser);
     } 
 } catch (error) {
     res.status(400).send(error.message);
 }
});

module.exports = router;
