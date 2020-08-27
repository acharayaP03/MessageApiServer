const mongoose = require('mongoose');

//since we need to know who send the message, we need to reference the user. 

const User = require('./user');

const messageSchema = mongoose.Schema({
        text: {
            type: String,
            required: true,
            maxLenght: 160, 
        
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

//while deleting message from the user,

messageSchema.pre('delete', async function(next){
    try {
        //find a user
        let user = await User.findById(this.user);

        //remove the id of the message from thier message list
        user.message.remove(this.id);
        //save that user
        await user.save();
        //return next
        return next();
    } catch (error) {
        return next(err)
    }
})

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
