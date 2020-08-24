const express = require('express');
const cors    = require('cors');
const PORT    = process.env.PORT || 8001;
const app = express();

const errorController = require('./Controllers/Error');

app.use(express.json());

app.use(cors())


//all our routes wil be here, if routes not found then send it to next() middle ware

app.use(function(req, res, next) {
    let err = new Error("Not found");
    
    err.status = 404;
    
    next(err);
})

//if there is an error with request the error will be catched by next(err), then will be displayed the appropriate error.

app.use(errorController)

app.listen(PORT, function(){
    console.log(`Server is listening on ${PORT}.`)
})
