 import asyncHandler from 'express-async-handler'
 import User from '../model/userModel.js';
 import generateToken from '../utils/generateToken.js';
 // @desc   Auth user/set token 
 // route   POST /api/users/auth
 // @access public
 const authUser = asyncHandler(async( req,res)=>{
    const { email , password } = req.body;

    const user = await User.findOne({ email });
    if( user && ( await user.matchPassword( password )) ){
        generateToken( res ,user._id );
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            profileImage : user.profileImage
        });
    }else{
        res.status(400);
        throw new Error("Invalid Email or Password ");

    }
     
});

 // @desc  Register a new user 
 // route   POST /api/users
 // @access public
 const registerUser = asyncHandler(async( req,res)=>{

    const { userName , email , password } = req.body;

    const userExist = await User.findOne({email: email}) ;
    if( userExist ){
        res.status(400);
        throw new Error("user alredsy exsist with this email")
    }
    const user = await User.create({
        name : userName , 
        email,
        password
    });
    if( user ){
        generateToken( res ,user._id );
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            profileImage : user.profileImage
        });
    }else{
        res.status(400);
        throw new Error("Invalid user data ")
    }

});

// @desc  Logout user 
// route   POST /api/users/logout
// @access public
const logoutUser = asyncHandler(async( req,res)=>{
    res.cookie('jwt' , '' , {
        httpOnly : true,
        expires : new Date( 0 )
    })
    res.status(200).json({message:" User loged out "})
});

// @desc   Get user profile 
// route   GTT /api/users/profile
// @access privet
const getUserProfiel = asyncHandler(async( req,res)=>{
    const user = {
        _id : req.user._id,
        name : req.user.name,
        email : req.user.email,
        profileImage : req.user.profileImage
    }
    res.status(200).json(user)
});


// @desc   Update Profile 
// route   PUT /api/users/profile
// @access privet
const updateUserProfile = asyncHandler(async( req,res)=>{
    const {  name , imageUrl  } = req.body
    const user = await User.findById(req.user._id);
    if( user ){
        user.name = name || user.name
        user.profileImage = imageUrl || user.profileImage
        
        
        const updatedUser = await user.save();

        res.status( 200 ).json({
            _id : updatedUser._id,
            name: updatedUser.name,
            email : updatedUser.email,
            profileImage : req.user.profileImage
        })

    }else{
        res.status(404);
        throw new Error(" User not fount ");
    }
   
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfiel,
    updateUserProfile
}