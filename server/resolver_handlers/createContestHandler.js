// handler for creating contest

const contestModel = require('../models/contestModel')

const createContestFunc = async function({name, tagline, createdBy, contestType, maxParticipants, deadline, rules, description},{req}){
    try {
        createdBy = req.userId
        deadline = new Date(deadline)
        const newContest = await contestModel.create({
            name,
            tagline,
            description,
            createdBy,
            contestType,
            maxParticipants,
            deadline,
            rules,
        })
        return newContest
    } catch (error) {
        console.log(error)
        throw new Error("Failed to create contest")
    }
}

module.exports = createContestFunc;