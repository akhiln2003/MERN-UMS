import React, { useEffect, useState } from "react";
import { Dot , Loader , EyeOff  , Eye } from "lucide-react";
import Buttons from "../../components/common/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegistorMutation } from "../../redux/slices/usersApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
function CreateUser() {
  let [ eye , setEye ] = useState(false); 
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validat, setValidat] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [registor, { isLoading }] = useRegistorMutation();
  useEffect(() => {
    if (!userInfo) navigate("/admin");
  }, [navigate, userInfo]);
  function handilChange(event) {
    const { name, value } = event.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    handilValidation(name, value);
  }
  function handilValidation(name, value) {
    const userNameRegex = /^(?=.{3,16}$)(?![-_])[a-zA-Z0-9-_]+(?<![-_])$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^[A-Za-z\d]{8,}$/;
    let errMessage = "";

    if (name == "userName" && !userNameRegex.test(value)) {
      errMessage = "Enter valid UserName ";
    }
    if (name == "email" && !emailRegex.test(value)) {
      errMessage = "Enter Valid Email";
    }
    if (name == "password" && !passwordRegex.test(value)) {
      errMessage = " Enter Secure Password ";
    }
    if (name == "confirmPassword" && data.password !== value) {
      errMessage = "Incorrect Password ";
    }

    setValidat((prev) => ({
      ...prev,
      [name]: errMessage,
    }));
  }

  function handilEye(){
    eye ? setEye(false) : setEye(true)
  }

  async function handilSubmit(event) {
    event.preventDefault();
    const { userName , email , password , confirmPassword } = data;
    let hasErrorsData = Object.values(data).some(value => value == '' );
    let hasErrorsValidate = Object.values(validat).some(value => value );

    if( hasErrorsValidate ){
      setValidat({
        userName: validat.userName ? validat.userName : "",
        email: validat.email ? validat.email : "",
        password: validat.password ? validat.password : "",
        confirmPassword: validat.confirmPassword ? validat.confirmPassword : "",
      });
      return
    }

    if( hasErrorsData ){
      setValidat({
        userName : !userName ? "Enter userName " : '',
        email : !email ? "Enter your email" : '',
        password : !password ? "Enter password" : '',
        confirmPassword : !confirmPassword ? " Confirm your password" : ''
      });
      return
    }
     
    try {
      const res = await registor({ userName, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Registration Successfully")
      navigate("/admin/dashbord");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }

    

  }

  return (
    <div className=" w-full flex  justify-center  ">
      <div className="  px-10 my-20 border border-solid border-gray-200border-2  rounded-md   ">
        <p className="font-bold text-4xl text-center mt-4 ">Sign up</p>
        <div className="mt-3 flex justify-center relative">
        
        <div className="mt-40">
      <input
            type="file"
            id="profileImageInput"
            style={{ display: 'none' }}
            onChange={handilChange}
            
          />
          <label  htmlFor="profileImageInput">
            <img
              src='/download.jfif'
              alt="Profile Preview"
              className="absolute bottom-9 right-32"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                cursor: 'pointer',
              }}
            />
           
          </label>
      </div>
        </div>
        <form className="flex flex-col  px-3" onSubmit={handilSubmit}>
          <input
            className="mt-5 mb-1 pl-1 border-b-2 text-base size-auto outline-none "
            type="text"
            name="userName"
            placeholder="Enter Username"
            value={data.userName}
            onChange={handilChange}
          />
          <span className="text-red-600 mb-5 ">
            {validat && validat.userName}
          </span>
          <input
            className="pl-1 mb-1  border-b-2 text-base size-auto outline-none "
            type="email"
            name="email"
            placeholder="Enter Email"
            value={data.email}
            onChange={handilChange}
          />
          <span className="text-red-600  ">{validat && validat.email}</span>
          { eye == true ? < Eye onClick={handilEye}  color="gray" size={20} className="relative top-5 left-72"  /> : < EyeOff onClick={handilEye} color="gray" size={20} className="relative top-5 left-72" />}

          <input
            className=" mb-1 border-b-2 text-base outline-none pl-1 "
            type={eye ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={data.password}
            onChange={handilChange}
          />
          <span className="text-red-600 mb-5 ">
            {validat && validat.password}
          </span>
          <input
            className=" mb-1 w-80 pl-1 border-b-2 text-base size-auto outline-none "
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChange={handilChange}
          />
          <span className="text-red-600 mb-10 ">
            {validat && validat.confirmPassword}
          </span>
          <Buttons
            text={  isLoading ? <Loader className=" animate-spin m-auto" /> : "Sign Up" }
            bgColor={"bg-green-500"}
            textColor={"text-white"}
            btnType={"submit"}
          />
        </form>
        <p className="flex text-sm ml-2 mt-3  mb-5">
          <Dot /> Already have an account ?
          <Link to={"/user/login"} className="ml-1 text-green-500 underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

export default CreateUser;
