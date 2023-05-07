const User = require('./model');
const { hashData } = require('./../../util/hashData');

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

module.exports = { createNewUser };