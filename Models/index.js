const mongoose = require('mongoose');

mongoose.set("debug", true);
mongoose.promise = Promise;
//this will remove the deprecation warining for useIndex warning
mongoose.set('useCreateIndex', true)
mongoose.connect("mongodb://localhost/messagingapp",{
    keepAlive: true,
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log("Mongo Db is connected"))
.catch(err => console.log(err));


module.exports.User = require('./user')
module.exports.Message = require('./message')