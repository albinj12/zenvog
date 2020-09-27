const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const azure = require('azure-storage')
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING)

const contestEntryModel = require('../models/contestEntryModel')
const userModel = require('../models/userModel')


const uploadImageFunc = async function(args,{req, res}) {
  if(req.user){
      return args.file.then ( file => {
        const {createReadStream, filename, mimetype} = file

        let streamSize = parseInt(req.headers['content-length'])

        const fileStream = createReadStream()

        const newFilename = uuidv4()
        
        // write stream to temp file
        // fileStream.pipe(fs.createWriteStream(__dirname+`/../temp/uploadedFiles/${filename}`))
          
        // blobService.createAppendBlobFromLocalFile('contest-entry-container',`${args.contestId}/${newFilename}`,__dirname+`/../temp/uploadedFiles/${filename}`,(error,response) => {
        //   if(!error){
        //     let entry = {
        //       url:`https://contestappstorageaccount.blob.core.windows.net/contest-entry-container/${args.contestId}/${newFilename}`,
        //       participant: req.userId
        //     }
        //     contestEntryModel.findOneAndUpdate({contestId: args.contestId},{$push:{entries:entry}},(err, doc) => {
        //       console.log("updated")
        //     })
              
        //   }

        //   // delete tem file after upload
        //   fs.unlink(__dirname+`/../temp/uploadedFiles/${filename}`,(err) => {
        //     if(err){
        //       console.log(err)
        //     }
        //   })
        // })
        
      blobService.createBlockBlobFromStream('contest-entry-container',`${args.contestId}/${newFilename}`,fileStream,streamSize,(error,response) => {
        if(!error){
          let entry = {
            url:`https://contestappstorageaccount.blob.core.windows.net/contest-entry-container/${args.contestId}/${newFilename}`,
            participant: req.userId
          }
          contestEntryModel.findOneAndUpdate({contestId: args.contestId},{$push:{entries:entry}},(err, doc) => {
            if(!err){
              userModel.findOneAndUpdate({_id: req.userId},{$push:{participatedContests:args.contestId}},(err,doc) => {
                console.log("updated")
              })
            }
          })
        }
      })


        return true;
        
      });
    }else {
      res.cookie("tid", "",{maxAge:"1"});
      res.cookie("sid", "",{maxAge:"1"});
      throw new AuthenticationError('Unautherized');
    }
    
}

module.exports = uploadImageFunc;