import React, { useEffect, useState } from "react";
import Buttons from "../../components/common/Buttons";
import { Loader } from "lucide-react";
import { useUpdateUserMutation } from "../../redux/slices/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { setCredentials } from "../../redux/slices/authSlice";

function UpdateProfile() {
  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [validat, setValidate] = useState("");
  const [ loading , setLoadin ]  = useState(false)
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [imagePreview, setImagePreview] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  async function handilSubmit(event) {
    event.preventDefault();
    if (validat) {
      return ;
    }
    if (!userName) {
      setValidate("enter UserName");
      return;
    }
    try {
      let imageUrl = userInfo.profileImage;
   
      setLoadin(true)
      if (profileImage) {
        imageUrl = await uploadImage(profileImage);
        if (!imageUrl) {
          return;
        }
      }
      setLoadin(false)
      const res = await updateUser({
        _id : userInfo._id,
        name : userName , 
        imageUrl,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile Updated');
      navigate('/user/profile');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
  function handilChange(event) {
    const { name, value } = event.target;
    if (name == "userName") {
      setUserName(value);
    } else {
      const file = event.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      setProfileImage(file);
    }
    if (name == "userName") handilValidation(value);
  }

  function handilValidation(value) {
    const userNameRegex = /^(?=.{3,16}$)(?![-_])[a-zA-Z0-9-_]+(?<![-_])$/;
    if (!userNameRegex.test(value)) {
      setValidate("Enter valid UserName ");
    } else {
      setValidate("");
    }
  }

  const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "mern_auth");
    formData.append("cloud_name", "dhktmurek");
    formData.append("folder", "Profile Image");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dhktmurek/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      toast.error("Image upload failed");
      return null;
    }
  };

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    setUserName(userInfo.name);
    setProfileImage(userInfo.profileImage);
  }, [userInfo.setUserName, userInfo.setProfileImage]);

  return (
    <div className=" w-full flex  justify-center  ">
      <div className="  px-10 my-20 border border-solid border-gray-200border-2 mt-40 rounded-md   ">
        <p className="font-bold text-4xl text-center mt-4 "> Edit Profile</p>
        <div className="mt-3 flex justify-center relative">
          <div className="mt-10">
            <input
              type="file"
              id="profileImageInput"
              style={{ display: "none" }}
              onChange={handilChange}
            />
            <label htmlFor="profileImageInput">
              <img
                src={imagePreview || profileImage}
                alt="Profile Preview"
                className="rounded-lg"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
              />
            </label>
          </div>
        </div>
        <form className="flex flex-col  pb-10 px-3" onSubmit={handilSubmit}>
          <input
            className="mt-5 mb-1 pl-1 border-b-2 text-base size-auto outline-none "
            type="text"
            name="userName"
            placeholder="Enter Username"
            value={userName}
            onChange={handilChange}
          />
          <span className="text-red-600 mb-5 ">{validat && validat}</span>
          <button disabled></button>

          <Buttons
            text={
              loading ? <Loader className="animate-spin m-auto" /> : "Update"
            }
            bgColor={"bg-green-500"}
            textColor={"text-white"}
            btnType={"submit"}
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}

export default UpdateProfile;
