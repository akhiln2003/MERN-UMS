import React, { useState, useRef, useEffect } from "react";
import { useDeleteuserMutation, useEdituserMutation } from "../redux/slices/admin/adminApiSlice";
import { toast } from "react-toastify";
import { Pen } from "lucide-react";
import Buttons from "./common/Buttons";
import { setAdminCredentials } from '../redux/slices/admin/adminAuthSlice';
import Modal from "./common/Modal";

const UserList = ({ user, refetch }) => {
  const [deleting, setDeleting] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [updatedPic, setUpdatedPic] = useState(null);
  const [orgPic, setOrgPic] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    profileImg: user.profileImage,
  });

  const inputRef = useRef(null);
  const inputFileRef = useRef(null);

  const [deleteUser, { isLoading: isDeleting }] = useDeleteuserMutation();
  const [editUser, { isLoading: isUpdating }] = useEdituserMutation();

  useEffect(() => {
    if (editingName) {
      inputRef.current.focus();
    }
  }, [editingName]);

  const handleProfileUpload = (event) => {
    const file = event.target.files[0];
    setUpdatedPic(URL.createObjectURL(file));
    setOrgPic(file);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", orgPic);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSaveName = async (value) => {
    if (!/^[a-zA-Z\s]+$/.test(value)) {
      toast.error("Username must contain only characters");
      return;
    } else if (!value.trim()) {
      toast.error("Required");
      return;
    } else if (value.length > 20) {
      toast.error("Not a valid name");
      return;
    }
    try {
      setEditingName(false);
      const res = await editUser({
        data: { name: value },
        id: user._id,
      }).unwrap();
      if (refetch) refetch();
      toast.success("Name updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err);
    }
  };

  const handleSaveProfileImg = async () => {
    try {
      let imageUrl = userData.profileImg;
      if (orgPic) {
        imageUrl = await uploadImage(orgPic);
        if (!imageUrl) {
          return;
        }
      }
      const res = await editUser({
        data: { imageUrl },
        id: user._id,
      }).unwrap();
      dispatch(setAdminCredentials({ ...res }));
      toast.success("Profile Updated");
      navigate("/user/profile");
    } catch (err) {
      toast.error(err?.data?.message || err);
    }
  };

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleCancelEdit = () => {
    setEditProfile(false);
    setUpdatedPic(null);
    setUserData((prevUserData) => ({
      ...prevUserData,
      profileImg: user.profileImg,
    }));
  };

  const triggerFileInput = () => {
    inputFileRef.current.click();
    setEditProfile(true);
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteUser(user._id).unwrap();
      setDeleting(false);
      setShowModal(false);
      if (refetch) refetch();
      toast.success("User deleted successfully");
    } catch (err) {
      toast.error("Error deleting user");
      setDeleting(false);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`${
        editProfile && isUpdating && "animate-pulse bg-slate-100"
      } mt-3 w-full items-center flex justify-between border border-gray-200 min-h-[10rem]`}
    >
      {showModal && (
        <Modal
          onClose={closeModal}
          onConfirm={handleDelete}
          isLoading={isDeleting}
        />
      )}
      <div className="ps-9 rounded-full">
        <img
          className="object-cover w-20 h-20 border rounded-full cursor-pointer"
          src={updatedPic || userData.profileImg}
          alt="profile"
          onClick={triggerFileInput}
        />
        <input
          ref={inputFileRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleProfileUpload}
        />
      </div>
      <div>
        {editingName ? (
          <input
            ref={inputRef}
            type="text"
            name="name"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSaveName(e.target.value);
              }
            }}
            value={userData.name}
            onChange={handleChange}
            className="font-semibold tracking-wide text-gray-700 border-none outline-none bg-transparent"
          />
        ) : (
          <div className="flex items-center">
            <h3 className="font-semibold tracking-wide text-gray-700">
              {userData.name}
            </h3>
            <Pen
              onClick={handleEditName}
              className="cursor-pointer ml-2"
              size={13}
            />
          </div>
        )}
        <p className=" text-xs tracking-wide font-bold ">{userData.email}</p>
      </div>
      <div className="pe-5 flex gap-5">
        {editProfile && (
          <div className="flex space-x-2">
            {!isUpdating && (
              <Buttons
                bgColor="bg-black"
                textColor="text-white"
                onclick={handleCancelEdit}
                text="Cancel edit"
              />
            )}
            {!isUpdating && (
              <Buttons
                bgColor="bg-black"
                textColor="text-white"
                onclick={handleSaveProfileImg}
                text="Save"
              />
            )}
          </div>
        )}
        {!editProfile && (
          <Buttons
            onclick={openModal}
            text="Delete"
            bgColor="bg-red-700"
            textColor="text-white"
            disabled={isDeleting}
          />
        )}
      </div>
    </div>
  );
};

export default UserList;
