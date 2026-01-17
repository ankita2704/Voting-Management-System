const mongoose= require('mongoose');
//const bcryptjs = require('bcryptjs');

//Define the candidate schema
const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    party:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    votes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
            votedAt:{
                type:Date,
                default:Date.now()
            }
        }
    ],
    voteCount:{
        type:Number,
        default:0
    },
    mobile:{
        type:String,
        required:true
    },
    isVoted:{
        type:Boolean,
        default:false
    }
});



const candidate=mongoose.model('candidate',candidateSchema);
module.exports = candidate;
