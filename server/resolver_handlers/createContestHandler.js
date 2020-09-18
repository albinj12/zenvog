// handler for creating contest

const contestModel = require('../models/contestModel')

const createContestFunc = async function({name, tagline, createdBy, contestType, maxParticipants}){
    try {
        const newContest = await contestModel.create({
            name,
            tagline,
            createdBy,
            contestType,
            maxParticipants
        })
        return newContest
    } catch (error) {
        console.log(error.error)
        throw new Error("Failed to create contest")
    }
}

module.exports = createContestFunc;