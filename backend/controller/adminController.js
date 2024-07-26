import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js';


// @desc   Auth admin/set token 
// route   POST /api/users/auth
// @access public
const authAdmin = asyncHandler(async( req,res)=>{
   const { email , password } = req.body;

   const admin = await User.findOne({ email });
   if( admin && ( await admin.matchPassword( password )) && admin.isAdmin  ){
       generateToken( res ,admin._id );
       res.status(201).json({
           _id : admin._id,
           name : admin.name,
           email : admin.email,
       });
   }else{
       res.status(400);
       throw new Error("Invalid Email or Password admin ");

   }
    
});


// @desc  Logout user 
// route   POST /api/users/logout
// @access public
const logoutAdmin = asyncHandler(async( req,res)=>{
   res.cookie('jwt' , '' , {
       httpOnly : true,
       expires : new Date( 0 )
   })
   res.status(200).json({message:" User loged out "})
});



// @desc   Get user profile 
// route   GTT /api/users/profile
// @access privet
const getAdminDashbord = asyncHandler(async( req,res)=>{
   const users = await User.find({ isAdmin : { $ne : true}})
   .select("-password")
    .sort({ updatedAt: -1 });
   res.status(200).json({users})
});




 // @desc  createUser a new user 
 // route   POST /api/users
 // @access public
const createUser = asyncHandler(async( req,res)=>{

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






// @desc   editUser Profile 
// route   PUT /api/users/profile
// @access privet
const editUser = asyncHandler(async( req,res)=>{
        const { id } = req.params;
        const { name, email ,imageUrl } = req.body;
        try {
          const user = await User.findById(id);
         
          if (!user) {
            res.status(404);
            throw new Error("User not found");
          }
          const userNameExists = await User.findOne({ name, _id: { $ne: user._id } });
          const userEmailExists = await User.findOne({
            email,
            _id: { $ne: user._id },
          });
          user.profileImage = imageUrl || user.profileImage
      
          if (userNameExists) {
            res.status(400);
            throw new Error("Username already exists");
          }
      
          if (userEmailExists) {
            res.status(400);
            throw new Error("Email already exists");
          }
          user.name = name || user.name;
          user.email = email || user.email;
          user.profileImage = imageUrl || user.profileImage
      
          const updatedUser = await user.save();
      
          res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            profileImage : updatedUser.profileImage
          });
        } catch (error) {
          res
            .status(500)
            .json({ message: "Failed to update user profile", error: error.message });
        }
      });

/// @desc Delete user
// @route DELETE api/admin/users/:id
// @access PRIVATE/ADMIN
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("something went wrong");
  }
  await User.findByIdAndDelete(id);
  res.status(200).json({ message: " user deleted successfully " });
});
  

export {
    authAdmin,
   logoutAdmin,
   getAdminDashbord,
   createUser,
   editUser,
   deleteUser
}