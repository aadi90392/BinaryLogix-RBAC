const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async(req,res)=>{
    try{
        const{name, email, password, phone,}= req.body;
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: 'User is Already Exists'});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        user = new User({
            name,
            email,
            password: hashedPassword,
            phone
        });

        await user.save();
        res.status(201).json({ message: 'User register successfully'});
         }
        catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
   
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Wrong Email OR password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Email OR password' });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } 
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profilePhoto: user.profilePhoto
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};