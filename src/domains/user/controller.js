const User = require('./model');
const { hashData, verifyHashedData } = require('./../../util/hashData');

const createToken = require('./../../util/createToken');

const authenticateUser = async (data) => {
    try {
        const { email, password } = data;

        // checking if user already exists
        const fetchedUser = await User.findOne({ email });

        if (!fetchedUser) {
            throw new Error('Invalid credentials entered!');
        }
        if (!fetchedUser.verified) {
            throw Error('Email hasn\'t been verified yet. Check your inbox.');
        }

        // compare password
        const hashedPassword = fetchedUser.password;
        const passwordMatch = await verifyHashedData(password, hashedPassword);

        if (!passwordMatch) {
            throw new Error('Invalid password entered!');
        }

        // create user token
        const tokenData = { userId: fetchedUser._id, email };
        const token = await createToken(tokenData);

        //assign user token
        fetchedUser.token = token;
        return fetchedUser;
    } catch (error) {
        throw new Error(error);
    }
}

const createNewUser = async (data) => {
    try {
        const { name, email, password } = data;

        // checking if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new Error('User already provided email already exists!');
        }

        // hash password
        const hashedPassword = await hashData(password);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const createdUser = await newUser.save();
        return createdUser;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { createNewUser, authenticateUser };