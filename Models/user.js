const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    }
});

//since the password cannot be saved on plain text, we will run mongoose hook to encrypt password before saving. below is the function.

userSchema.pre("save", async function(next){
    try{
        //here we are hashing only once, if user hasnt change password.
        //
        if(!this.isModified("password")){
            next()
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        //hash the password and assign it to the user shcema password field.
        this.password = hashedPassword;
        return next();
    }catch(err){
        //if any error, send to the error controller.
        return next(err);
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;