const userModel = require('../models/user.model')
const bcryptjs = require('bcryptjs')

async function registerUser(req, res) {
    const { fullName:{firstName, lastName},email, password} = req.body;

    const isUserExist= await userModel.findOne({ email })

    if(isUserExist){
        res.status(400).json({
            message: "User already exists."
        })
    }

    const user = await userModel.create({
        fullName:{
            firstName, lastName
        },
        email,
        password: hashPassword
    })

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "User register successfully",
        user:{
            email: user.email,
            _id: user._id,
            fullName: user.fullName 
        }
    })
}

async function loginUser(req, res) {
    const {email, password} = req.body;

    const user = await userModel.findOne({ email })
    if(!user){
        return res.status(400).json({ message: "Invalid email or password"})
    }

    const isPasswordValid =await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({ message: "Invalid email or password"})
    }

    const token = jwt.sign({ id:user._id}, process.env.JWT_SECRET)

    
}


module.exports = {
    registerUser,
}