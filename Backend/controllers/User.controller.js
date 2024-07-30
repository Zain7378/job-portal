const userModel= require('../models/User.model.js');

const signup = async (req,res)=>{
    try {
        const { name, email, password } = req.body;
        const newUser = new userModel({
           name,
           email,
           password 
        })
        const result = await newUser.save();
        res.status(201).json(result);
    } catch (error) {
        console.log('error:' ,error)
        res.status(500).json(error);
    }
}
const login = async (req,res)=>{
try {
    const {email , password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }
    const isValidPassword = await user.password===password;
    if(!isValidPassword){
        return res.status(401).json({message: 'Invalid password'});}
        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                fullname: user.name,
                email: user.email,
            }
        });

} catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Internal server error" });
}    
}
module.exports = {signup,login};