const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const azure = require('azure-storage')
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING)

const contestEntryModel = require('../models/contestEntryModel')


const uploadImageFunc = async function(args) {
    return args.file.then ( file => {
      const {createReadStream, filename, mimetype} = file

      const fileStream = createReadStream()

      const newFilename = uuidv4()
      
      // write stream to temp file
      fileStream.pipe(fs.createWriteStream(__dirname+`/../temp/uploadedFiles/${filename}`))
        
      blobService.createAppendBlobFromLocalFile('contest-entry-container',`${args.contestId}/${newFilename}`,__dirname+`/../temp/uploadedFiles/${filename}`,(error,response) => {
        if(!error){
          console.log(response)
          let entry = {
            url:`https://contestappstorageaccount.blob.core.windows.net/contest-entry-container/${args.contestId}/${newFilename}`,
            participant: args.createdBy
          }
          contestEntryModel.findOneAndUpdate({contestId: args.contestId},{$push:{entries:entry}},(err, doc) => {
            console.log(doc)
          })
            
        }

        // delete tem file after upload
        fs.unlink(__dirname+`/../temp/uploadedFiles/${filename}`,(err) => {
          if(err){
            console.log(err)
          }
        })
      })
      
    // blobService.createBlockBlobFromStream('contest-entry-container',`contest/${filename}`,fileStream,50*1024*1024,(error,response) => {
    //   if(!error){
    //     console.log(response)
    //   }
    // })


      return file;
      
    });
}

module.exports = uploadImageFunc;