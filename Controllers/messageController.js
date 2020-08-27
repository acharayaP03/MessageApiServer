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
//api end point : GET -. api/users/:id/mesages/:message_id
exports.getMessage = async function (req, res, next){
    try {
        let message = await conn.Message.find(req.params.message_id);
        return res.status(200).json(message)
    } catch (error) {
        return next(error)
    }
}

//delete message
//api end point : delete -. api/users/:id/mesages/:message_id
exports.deleteMessage = async function(req, res, next){
    try {
        let foundMessage = await conn.Message.findById(req.params.message_id);

        await foundMessage.remove();

        return res.status(200).json(foundMessage);
    } catch (error) {
        return next(error)
    }
}