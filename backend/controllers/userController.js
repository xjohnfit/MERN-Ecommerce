import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/createToken.js';

//create user function
const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    //fields validation
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }

    //check if users already in the mongodb
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    //save user
    try {
        await newUser.save();
        createToken(res, newUser._id);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(400);
        throw new Error('User creation failed');
    }
});

//create loginUser function
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordMatch = await bcrypt.compare(
            password,
            existingUser.password
        );
        if (isPasswordMatch) {
            createToken(res, existingUser._id);
            res.status(201).json({ message: 'Login successful' });
        } else {
            res.status(401);
            throw new Error('Invalid credentials');
        }
        return;
    } else {
        res.status(401);
        throw new Error('No user found');
    }
});

//create logoutUser function
const logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logout successful' });
});

//get all users function
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

//get current user profile function
const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

//update current user profile function
const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

//delete user by id function
const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        if(user.isAdmin) {
            res.status(400);
            throw new Error('Cannot delete admin user');
        }

        await User.deleteOne({ _id: user._id });
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

//get user by id function
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if(user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

//update user by id function
const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.isAdmin = Boolean(req.body.isAdmin);

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });

    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export {
    createUser,
    loginUser,
    logoutUser,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById,
};
