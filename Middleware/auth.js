//make sure we load any environment variables..
require('dotenv').load;

const jwt = require('jsonwebtoken');

// make sure the user is logged - Authentication
exports.loginRequired = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, payload){
            if(payload){
                //if the pay load is varified by jwt then let user login in.
                return next();
            }else{
                return next({
                    status: 401,
                    message: "pleae log in first"
                })
            }
        });
    }catch(e){
        return next({
            status: 401,
            message: "pleae log in first"
        })
    }
}
//make sure we get the correct user - Authrization
exports.ensureCorrectUser = function(req, res, next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, function(err, payload){
            // onlh allow user if the payload id is equals to users id
            //payload is the second part of the jwt token, see jwt documentation.
            if(payload && payload.id === req.params.id){
                // here we are checking if payload exist in user request and if the payload matches to the jwt payoad.
                // if it matches then let them through. 
                return next();
            }else{
                //if payload doesnt matches then deny acess.
                return next({
                    status: 401,
                    message: "Access Unauthorized."
                })
            }
        })
    }catch(e){
        return next({
            //if anyting goes wrong with request still show them access denied error.
            status: 401,
            message: "Access Unauthorized."
        })
    }
}

