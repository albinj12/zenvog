const contestModel = require('../models/contestModel')
const contesModel = require('../models/contestModel')

const setContestStatus = async () => {
    const today = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
    const startContests = await contestModel.updateMany({"startDate":today},{status:"Ongoing"})
    const endContests = await contestModel.updateMany({"deadline":today},{status:"Finished"})    
}

module.exports = setContestStatus
