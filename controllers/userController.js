import User from "../models/User.js";
import generateJWT from "../helpers/generateJWT.js";
import generateId from "../helpers/generateId.js";
import emailCreation  from "../helpers/registrationEmail.js";
import forgotPasswordEmail from "../helpers/forgotPasswordEmail.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        const error = new Error('User Already Exists');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const user = new User(req.body);
        const savedUser = await user.save();

        // Send email to registered user
        await emailCreation({
            name,
            email,
            token: savedUser.token
        })

        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Register Error:', error); // log the actual error to your terminal
        res.status(400).json({ msg: error.message || 'An unexpected error occurred' });
    }

}

const confirm = async (req, res) => {
    const { token } = req.params;
    const confirmedUser = await User.findOne({ token });

    if (!confirmedUser) {
        const error = new Error('Invalid Token');
        return res.status(400).json({ msg: error.message });
    }

    try {
        confirmedUser.token = null;
        confirmedUser.confirmed = true;
        await confirmedUser.save();
        res.status(200).json({ msg: 'User Succesfully Confirmed'});
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
    res.json({ msg: 'Your Account is Being Confirmed...' });
}

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Verify if user exists
    if (!user) {
        const error = new Error('User Not Found');
        return res.status(404).json({ msg: error.message });
    }

    // Verify if user has confirmed his/her account
    if (!user.confirmed) {
        const error = new Error(`The account hasn't been confirmed`);
        return res.status(403).json({ msg: error.message });
    }

    // Verify if the password matches DB
    if ( !(await user.checkPassword(password)) ) {
        const error = new Error(`Incorrect Password`);
        return res.status(403).json({ msg: error.message });
    }

    // Generate JWT
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateJWT(user.id)
    });
}

const profile = (req, res) => {
    const { user } = req;
    res.json( user );
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    
    const user = await User.findOne({ email });

    // If the email's not registered, notify the user
    if (!user) {
        const error = new Error(`User Not Found`);
        res.status(404).json({ msg: error.message });
    }

    // If the user is found generate a new token
    try {
        user.token = generateId();
        await user.save();

        // Send email
        await forgotPasswordEmail({
            name: user.name,
            email,
            token: user.token
        });

        res.json({ msg: 'A mail with the instructions has been sent' });
    } catch (error) {
        const e = new Error('An error occurred');
        res.status(400).json({ msg: e.message });
    }
}

const tokenCheck = async (req, res) => {
    // Retrieve the token from the URL
    const { token } = req.params;
    const validToken = await User.findOne({ token });

    // Notify the user if the token is not found
    if (!validToken) {
        const error = new Error('Invalid Token');
        res.status(400).json({ msg: error.message });
    }

    res.json({ msg: 'Valid Token' });
}

const newPassword = async (req, res) => {
    // Retrieve token from the URL
    const { token } = req.params;
    const { password } = req.body;
    const user = await User.findOne({ token });

    if (!user) {
        const e = new Error('An error occurred');
        res.status(400).json({ msg: e.message });
    }

    // If the token is found eliminate the token and set the new password
    try {
        user.token = null;
        user.password = password;
        await user.save();
        res.json({ msg: 'Password successfully changed' });
    } catch (error) {
        const e = new Error('There was an error');
        res.status(400).json({ msg: e.message });
    }
}

const updateProfile = async (req, res) => {
    const { name, email, website, phone } = req.body;
    const { id } = req.params;

    // User Identificaition
    const user = await User.findById(id);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    // Email Validation
    if (user.email.trim() !== email.trim()) {
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            const error = new Error('Email already in use');
            return res.status(400).json({ msg: error.message });
        }
    }

    // Replacing original values
    try {
        user.name = name;
        user.email = email;
        user.phone = phone;
        user.website = website;

        const updatedUser = await user.save();
        res.json({ msg: 'User updated correctly', updatedUser });
    } catch (error) {
        console.log(error);
        const e = new Error('Server error');
        return res.json(500).json({ msg: e.message });
    }
}

const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { id } = req.user;

    // Look after the user
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Verify current password
    if ( !(await user.verifyPassword(currentPassword)) ) 
        return res.status(400).json({ msg: 'Current password is incorrect' });

    // Store new password
    try {
        user.password = newPassword;
        await user.save();
        res.json({ msg: 'Password sucessfully updated' });
    } catch (error) {
        console.log(error);
        const e = new Error('Server error');
        return res.status(500).json({ msg: e.message });
    }


}

export {
    register,
    profile,
    confirm,
    authenticate,
    forgotPassword,
    tokenCheck,
    newPassword,
    updateProfile,
    updatePassword
}