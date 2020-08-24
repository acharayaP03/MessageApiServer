const conn = require('../Models');
const jwt = require('jsonwebtoken');
const { urlencoded } = require('express');

//sing in routes
exports.signin = async function(req, res, next){
    try {
        let user = await conn.User.findOne({email: req.body.email});
        let { id, username, porfileImageUrl} = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign({
                id, username, porfileImageUrl
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id, username, porfileImageUrl, token
            })
        }else{
            return next({
                status: 400,
                message: "Invalid email/ password"
            })
        }
    } catch (error) {
        return next({
            status: 400,
            message: "Invalid email/ password"
        });
    }
}
//sign up routes 
exports.signup = async function(req, res, next){
    try{
        let user = await conn.User.create(req.body);
        let { id, username, porfileImageUrl } = user;
        let token = jwt.sign({
            id, 
            username, 
            porfileImageUrl
        },
        process.env.SECRET_KEY
        );
        return res.status(200).json({
            id,
            username,
            porfileImageUrl,
            token
        });
    }catch(err){
        //moongose validation code and if it fails.
        if(err.code === 11000){
            err.message = "Sorry, that userner/ or email is already in use";
        }
        return next({
            status: 400, 
            message: err.message
        })
    }
}