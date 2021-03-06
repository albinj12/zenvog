const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const azure = require('azure-storage')
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING)

const contestEntryModel = require('../models/contestEntryModel')
const userModel = require('../models/userModel')
const contestModel = require('../models/contestModel')


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
      
      const newEntry = {
        url:"",
        votes:0,
        _id:"",
        participant:{
          name:""
        }
      }

      const promise = new Promise((resolve, reject) => {
        blobService.createBlockBlobFromStream('contest-entry-container',`${args.contestId}/${newFilename}`,fileStream,streamSize,(error,response) => {
          if(!error) resolve(response)
          else reject(error)
        })
      })
        
      // blobService.createBlockBlobFromStream('contest-entry-container',`${args.contestId}/${newFilename}`,fileStream,streamSize,(error,response) => {
      //   if(!error){
      //     let entry = {
      //       url:`https://contestappstorageaccount.blob.core.windows.net/contest-entry-container/${args.contestId}/${newFilename}`,
      //       participant: req.userId
      //     }
      //     contestEntryModel.findOneAndUpdate({contestId: args.contestId},{$push:{entries:entry}},(err, doc) => {
      //       if(!err){
      //         userModel.findOneAndUpdate({_id: req.userId},{$push:{participatedContests:args.contestId}},(err,doc) => {
      //           console.log("updated")
      //         })
      //       }
      //     })
      //   }
        
      // })

      return promise.then(async (response) => {
        let entry = {
          url:`https://contestappstorageaccount.blob.core.windows.net/contest-entry-container/${args.contestId}/${newFilename}`,
          participant: req.userId
        }
        await contestEntryModel.findOneAndUpdate({contestId: args.contestId},{$push:{entries:entry}})
        const user = await userModel.findOneAndUpdate({_id: req.userId},{$push:{participatedContests:args.contestId}})
        const entryDetails = await contestEntryModel.findOne({contestId:args.contestId}).select({entries:{$elemMatch:{participant:req.userId}}})
        await contestModel.findByIdAndUpdate(args.contestId,{$inc:{currentParticipants: 1}})
        newEntry.url = entryDetails.entries[0].url
        newEntry._id = entryDetails.entries[0]._id
        newEntry.participant.name = user.name
        newEntry.participant._id = user._id
        return newEntry;
      }).catch(error => {
        //remove image from blob storage and remove entry
        console.log(error)
        return false;
      })
        
      });
    }else {
      res.cookie("tid", "",{maxAge:"1"});
      res.cookie("sid", "",{maxAge:"1"});
      throw new AuthenticationError('Unautherized');
    }
    
}

module.exports = uploadImageFunc;