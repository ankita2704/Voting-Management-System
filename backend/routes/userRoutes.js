const express = require('express');
const router = express.Router();
const User=require('../user');
const bcrypt = require("bcryptjs");
const {jwtAuthMiddleware,generateToken} = require('./../jwt');

router.post('/signup',async(req,res)=>{
    try{
        const data = req.body //Assuming the request body contains the User data

        //create a new User document using the Mongoose model
        const newUser = new User(data);
        //save the new User to the database
        const response = await newUser.save();
        console.log('data saved');

        const payload = {
            id:response.id
        }

        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ",token);

        res.status(200).json({response:response,token:token});
    }
    

    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
}
)

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { aadharCardNumber, password } = req.body;

    // ✅ Use User model (capital U)
    const user = await User.findOne({ aadharCardNumber });

    // ❌ User not found
    if (!user) {
      return res.status(401).json({ error: "Invalid Aadhar or password" });
    }

    // ✅ Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid Aadhar or password" });
    }

    // ✅ Token payload
    const payload = {
      id: user._id,
      role: user.role
    };

    // ✅ Generate token
    const token = generateToken(payload);

    // ✅ Send token + role
    res.json({
      token,
      role: user.role
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//Profile route
router.get('/profile',jwtAuthMiddleware,async (req,res)=>{
    try{
        const userData = req.user;
        const userId = userData.id;
        const user=await user.findById(userId);
        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({error:'Internal server Error'});
    }    
    
})

router.put('/profile/password',jwtAuthMiddleware,async(req,res)=>{
    try{
        const userId = req.user.id; //Extract the id from the token
        const{currentPassword,newPassword}=req.body //Extract current and new passwords from request body

        //Find the user by UserId
         const user = await user.findById(userId);

        //If password does not match,return error
         if(!(await user.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'});
        }

        //Update the users's password
        user.password = newPassword;
        await user.save();

       console.log('password updated');
       res.status(200).json({message:"Password updated"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

module.exports = router;  