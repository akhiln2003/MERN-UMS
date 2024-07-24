import React, { useEffect, useState } from "react";
import { Dot, Eye, EyeOff, Loader } from "lucide-react";
import Buttons from "../../components/common/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/slices/usersApiSlice";
import { setCredentials } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [validat, setValidat] = useState({
    email: "",
    password: "",
  });
  const [ eye , setEye ] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^[A-Za-z\d]{8,}$/;
    let errMessage = "";

    if (name == "email" && !emailRegex.test(value)) {
      errMessage = "Enter Valid Email";
    }
    if (name == "password" && !passwordRegex.test(value)) {
      errMessage = " Enter Secure Password ";
    }

    setValidat((prev) => ({
      ...prev,
      [name]: errMessage,
    }));
    return;
  }

  function handilEye(){
    eye ? setEye(false) : setEye(true);
  }

  async function handilSubmit(event) {
    event.preventDefault();
    const { email, password } = data;
    try {
      if (!email || !password) {
        setValidat({
          email: !email ? "Enter your email" : "",
          password: !password ? "Enter your Password" : "",
        });
        return;
      }

      if (validat.email || validat.password) {
        setValidat({
          email: validat.email ? validat.email : "",
          password: validat.password ? validat.password : "",
        });
        return;
      }

      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login Successfully")
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
    <div className=" w-full flex  justify-center  ">
      <div className="  px-10 my-20 border border-solid border-gray-200border-2  rounded-md   ">
        <p className="font-bold text-4xl text-center mt-4 ">Sign In</p>
        <div className="mt-10 flex justify-center relative">
          <span className="">
            <img src="/download.jfif" alt="dfsd" />
          </span>
        </div>
        <form className="flex flex-col  px-3" onSubmit={handilSubmit}>
          <input
            className=" mt-5 pl-1 border-b-2 text-xl size-auto outline-none "
            type="email"
            name="email"
            placeholder="Enter Email"
            value={data.email}
            onChange={handilChange}
          />
          <span className="text-red-600 mb-5 ">{validat && validat.email}</span>
          { eye == true ? < Eye onClick={handilEye}  color="gray" size={20} className="relative top-5  left-64"  /> 
          : < EyeOff onClick={handilEye} color="gray" size={20} className="relative  left-64 top-5" />}
          <input
            className="  w-72   border-b-2 text-xl outline-none pl-1  "
            type={ eye ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={data.password}
            onChange={handilChange}
          />
          
          <span className="text-red-600 mb-14 ">
            {validat && validat.password}
          </span>

          <Buttons
            text={
              isLoading ? <Loader className=" animate-spin m-auto" /> : "Login"
            }
            bgColor={"bg-green-500"}
            btnType={"submit"}
            textColor={"text-white"}
          />
        </form>
        <p className="flex text-sm ml-2 mt-5 ">
          
          <Dot /> Forgout
          <span className="ml-1 text-green-500">Password ?</span>
        </p>
        <p className="flex text-sm ml-2  mb-5">
          <Dot /> Don’t have an account?
          <Link to={"/user/signup"} className="ml-1 text-green-500 underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
