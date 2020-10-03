const contestModel = require('../models/contestModel')

const getContestsFunc = async function(){
    return contestModel.find()
}

module.exports = getContestsFunc;