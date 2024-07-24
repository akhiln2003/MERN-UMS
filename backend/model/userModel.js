import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    profileImage:{
        type:String,
        default:'https://media.kcm.fm/wp-uploads/2024/06/blank-profile-picture-973460_640.png'
      },
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true,
        unique: true 
    },
    password:{
        type:String,
        required : true
    }
},{
    timestamps: true
});

userSchema.pre('save' , async function ( next ){
    if( !this.isModified('password')){
        next()
    } 
    const  salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash( this.password , salt)
});

userSchema.methods.matchPassword = async function ( enteredPassword ) {
    return await bcrypt.compare( enteredPassword , this.password )
}

const User = mongoose.model("User" , userSchema );
export default User