function errorController (error, req, res, next){
    //retun this error, if not found then send whatever the error that was defined else send error with status of 500 which means the page was found but something went worng with server.
    return res.status(error.status || 500).json({
        error: {
            message: error.message || " Opps, Something went wrong. "
        }
    })
}

module.exports = errorController;