import { Dot, Eye, EyeOff } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch , useSelector} from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import Buttons from '../../components/common/Buttons';
import { useAuthadminMutation } from '../../redux/slices/admin/adminApiSlice'
import { setAdminCredentials } from '../../redux/slices/admin/adminAuthSlice'
import {toast} from 'react-toastify'
function AdminLogin() {


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
      const { adminInfo } = useSelector((state) => state.adminauth);
      const [adminlogin, { isLoading }] = useAuthadminMutation();

      useEffect(() => {
        if ( adminInfo ) navigate("/admin");
      }, [navigate, adminInfo]);

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
    
          const res = await adminlogin({ email, password }).unwrap();
          dispatch(setAdminCredentials({ ...res }));
          toast.success(`welcome back ${res.name}`);
          navigate("/admin");
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      }
  return (
    <div className=" w-full h-screen flex  justify-center bg-gray-200 pt-10  ">
      <div className="  px-10 my-32 border border-solid border-gray-500   rounded-md   ">
        <p className="font-bold text-4xl text-center mt-4 ">Sign In</p>
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
           'Login'

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
      
      </div>
    </div>
  )
}

export default AdminLogin