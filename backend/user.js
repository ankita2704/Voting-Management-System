const mongoose= require('mongoose');
const bcryptjs = require('bcryptjs');

//Define the User schema
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    address:{
        type:String,
        required: true
    },
    aadharCardNumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        required:true,
        type:String
    },
    role:{
        type:String,
        enum:['voter','admin'],
        default:'voter'
    },
    isVoted:{
        type:Boolean,
        default:false
    }
});

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
});


userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        //Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcryptjs.compare(candidatePassword,this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const User=mongoose.model('User',userSchema);
module.exports = User;
