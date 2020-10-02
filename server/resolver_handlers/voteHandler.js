const contestEntryModel = require('../models/contestEntryModel');

const voteFunc = async function(args, {req, res}){
    if(req.user){
        let alreadyVoted
        const entryVoteDetails = await contestEntryModel.findOne({contestId: args.contestId, 'entries._id':args.entryId},"entries")
        for(let i=0; i<entryVoteDetails.entries[0].votesBy.length; i++){
            if(req.userId == entryVoteDetails.entries[0].votesBy[i].toString()){
                alreadyVoted = true
                break
            }
            alreadyVoted = false
        }
        if(alreadyVoted){
            await contestEntryModel.findOneAndUpdate({contestId: args.contestId, 'entries._id':args.entryId},{$pull: {'entries.$.votesBy':req.userId},$inc: {'entries.$.votes': -1}})
        }else{
            await contestEntryModel.findOneAndUpdate({contestId: args.contestId, 'entries._id':args.entryId},{$push:{'entries.$.votesBy':req.userId},$inc: {'entries.$.votes': 1}})
        }
        return "success"
    }
}

module.exports = voteFunc;