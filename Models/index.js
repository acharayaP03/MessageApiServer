const mongoose = require('mongoose');

mongoose.set("debug", ture);
mongoose.promise = Promise;

mongoose.connect("mongodb://localhost/messagingapp",{
    keepAlive: true,
    useMongoclient: true
})