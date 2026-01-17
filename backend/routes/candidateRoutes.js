const express = require('express');
const router = express.Router();
const Candidate=require('../candidate');
const User = require('../user');
const {jwtAuthMiddleware} = require('./../jwt');

const checkAdminRole = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (user && user.role === 'admin') {
            return true;
        }
        return false;
    } catch (err) {
        return false;
    }
};

//POST route to add a candidate
router.post('/',jwtAuthMiddleware,async(req,res)=>{
    try{
        if(!(await checkAdminRole(req.user.id)))
            return res.status(404).json({message:'user does not have admin role'});
        
        const data = req.body //Assuming the request body contains the candidate data

        //create a new User document using the Mongoose model
        const newCandidate = new Candidate(data);
        //save the new candidate to the database
        const response = await newCandidate.save();
        console.log('data saved');
        res.status(200).json({response:response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server Error'});
    }
})



//Profile route


router.put('/:candidateID',jwtAuthMiddleware,async(req,res)=>{
    try{
        if(!(await checkAdminRole(req.user.id)))
            return res.status(403).json({message:'user does not have admin role'});

        const candidateID = req.params.candidateID; //Extract the id from the URL parameter
        const updatedCandidateData = req.body; //Updated data for the person

        const response = await Candidate.findByIdAndUpdate(candidateID,updatedCandidateData,{
             new:true, //Return the updated document
             runValidators:true, //Run mongoose validation
        })

        if(!response){
            return res.status(403).json({error:'Candidate not found'});
        }
       console.log('Candidate data updated');
       res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

//Delete

router.delete('/:candidateID',jwtAuthMiddleware,async(req,res)=>{
    try{
        if(!(await checkAdminRole(req.user.id)))
            return res.status(403).json({message:'user does not have admin role'});

        const candidateID = req.params.candidateID; //Extract the id from the URL parameter
        

        const response = await Candidate.findByIdAndDelete(candidateID)

        if(!response){
            return res.status(403).json({error:'Candidate not found'});
        }
       console.log('Candidate deleted');
       res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
})

//Lets start voting
router.post('/vote/:candidateID',jwtAuthMiddleware,async (req,res)=>{
    //no admin can vote
    //user can vote only once

    const candidateID = req.params.candidateID;
    const userId = req.user.id;

    try{
        //find the candidate document with the specified candidateID
        const candidate = await Candidate.findById(candidateID);
        if(!candidate){
            return res.status(404).json({message:'Candidate not found'});
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        if(user.isVoted){
            return res.status(400).json({message:'You have already voted'});
        }
        if(user.role=='admin'){
            return res.status(400).json({message:'admin is not allowed'});
        }

        //Update the Candidate document to record the vote
        candidate.votes.push({user:userId})
        candidate.voteCount++;
        await candidate.save();

        //update the user document
        user.isVoted=true
        await user.save();

        res.status(200).json({message:"Vote recorded successfully"});
    }catch(err){
         console.log(err);
        res.status(500).json({error:'Internal server error'});
    }
});

//vote count
router.get('/vote/count', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!(await checkAdminRole(req.user.id))) {
            return res.status(403).json({ message: 'Admin access only' });
        }

        const candidates = await Candidate.find()
            .select('party voteCount')
            .sort({ voteCount: -1 });

        const voteRecord = candidates.map(c => ({
            party: c.party,
            count: c.voteCount
        }));

        res.status(200).json(voteRecord);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Display the list of candidates
router.get('/list', async (req, res) => {
    try {
        const candidates = await Candidate.find().select('name party age mobile');

        res.status(200).json({
            success: true,
            candidates
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router; 