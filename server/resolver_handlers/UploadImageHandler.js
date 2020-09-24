var fs = require('fs')

const uploadImageFunc = async function(args) {
    return args.file.then(file => {
        const {createReadStream, filename, mimetype} = file

        const fileStream = createReadStream()

        fileStream.pipe(fs.createWriteStream(__dirname+`/uploadedFiles/${filename}`))

        return file;
        
      });
}

module.exports = uploadImageFunc;