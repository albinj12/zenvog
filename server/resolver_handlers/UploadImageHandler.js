const fs = require('fs')
const azure = require('azure-storage')
const blobService = azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING)


const uploadImageFunc = async function(args) {
    return args.file.then(file => {
      const {createReadStream, filename, mimetype} = file

      const fileStream = createReadStream()
      
      fileStream.pipe(fs.createWriteStream(__dirname+`/../temp/uploadedFiles/${filename}`))
        
      blobService.createAppendBlobFromLocalFile('contest-entry-container',`contest/${filename}`,__dirname+`/../temp/uploadedFiles/${filename}`,(error,response) => {
        if(!error){
          console.log(response)
        }
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