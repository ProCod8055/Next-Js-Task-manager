import mongoose from 'mongoose'

const UserSchema  = new mongoose.Schema({
    Fname:{
        type:String,
    },
    email:{
       type: String,
       unique: true,
       required:[true,"Email Required"],
    },
    password:{
        type:String,
        required:[true,"Password Required"],
    },
    about:String,
    
    profileURL:String,
})

export const UserModel =mongoose.models.users || mongoose.model('users',UserSchema); //here users ia a name of our collection which will be created in database
