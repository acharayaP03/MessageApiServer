const mongoose = require('mongoose');

mongoose.set("debug", true);
mongoose.promise = Promise;

mongoose.connect("mongodb://localhost/messagingapp",{
    keepAlive: true,
    useMongoclient: true,
    useNewUrlParser: true
}).then(() => console.log("Mongo Db is connected"))
.catch(err => console.log(err));


module.exports.User = require('./user')