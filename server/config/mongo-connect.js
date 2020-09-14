const mongoose = require('mongoose');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
});

var db = mongoose.connection;

// check connection
db.on('open', () => {
    console.log('Connected');
});

// check for db error
db.on('error', (err) => {
    console.log(err);
});