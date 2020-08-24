const conn = require('../Models');
const jwt = require('jsonwebtoken');


//sign up routes 
exports.signup = async function(req, res, next){
    try{
        let user = await conn.User.create(req.body);
        let { id, username, porfileImageUrl } = user;
        let token = jwt.sign({
            id, 
            username, 
            porfileImageUrl,
            token
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