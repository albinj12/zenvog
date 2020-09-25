// handler for creating contest

const contestModel = require('../models/contestModel')
const contestEntryModel = require('../models/contestEntryModel')

const createContestFunc = async function({name, tagline, createdBy, contestType, maxParticipants, deadline, rules, description, startDate},{req}){
    try {
        createdBy = req.userId
        deadline = new Date(deadline)
        startDate = new Date(startDate)
        const newContest = await contestModel.create({
            name,
            tagline,
            description,
            createdBy,
            contestType,
            maxParticipants,
            deadline,
            rules,
            startDate
        })
        if(newContest){
            newContestEntry = await contestEntryModel.create({
                contestId: newContest._id
            })
        }
        return newContest
    } catch (error) {
        console.log(error)
        throw new Error("Failed to create contest")
    }
}

module.exports = createContestFunc;