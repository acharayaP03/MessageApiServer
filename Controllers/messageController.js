const conn = require('../Models');

//create message
exports.createMessage = async function (req, res, next){
    try {
        let message = await conn.Message.create({
            text: req.body.text,
            user: req.params.id
        });

        let foundUser = await conn.User.findById(req.params.id);
        //once found the user, push the message. note messages field comes from User model
        foundUser.messages.push(message.id);
        //then save the user
        await foundUser.save();

        let foundMessage = await conn.Message.findById(message._id).populate("user", 
            {
                username: true,
                profileImageUrl: true
            }
        )

        //if all goes well then send the response.
        return res.status(200).json(foundMessage)
    } catch (error) {
        return next(error)
    }
}

//get message 
exports.getMessage = async function (req, res, next){

}

//delete message
exports.deleteMessage = async function(req, res, next){

}