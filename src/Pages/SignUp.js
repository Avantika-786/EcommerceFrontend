import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import loginIcons from "../assest/signin.gif";

import summaryapi from "../common";
import toast from "react-hot-toast";
import uploadImage from "../Helpers/uploadImage";

function SignUp() {
  const [showPassword, setPassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(summaryapi.signUp.url, {
        method: summaryapi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataapi = await dataResponse.json();
      if (dataapi.success) {
        console.log("User Created Successfully");
        toast.success("User Created Successfully");
        navigate("/login");
      } else {
        toast.error(dataapi.message);
      }

      // toast.success("User Created Successfully");
    } else {
      toast.error("Please check password and confirm password");
      console.log("Please check password and confirm password");
    }
  };
  const handleUploadPic = async (event) => {
    // const file = event.target.files[0];
    // const image = await imageToBase64(file);
    // console.log("file", image);
    // setData((prev) => {
    //   return {
    //     ...prev,
    //     profilePic: image,
    //   };
    // });
    const file = event.target.files[0];
    // setuploadProductImageInput(file.name);
    // console.log(file);
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => {
      return {
        ...prev,
        profilePic: uploadImageCloudinary.url,
      };
    });
  };
  console.log(data);
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto ">
          <div className="h-20 w-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcons} alt="login icons" />
            </div>
            <form action="">
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload photo
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          <form
            action=""
            className="pt-6 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
            <div className="">
              <label htmlFor="">Username : </label>
              <div className="bg-slate-100 p-2 ">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  placeholder="Enter Your Username"
                  onChange={handleOnChange}
                  className="w-full h-full  outline-none bg-transparent "
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="">Email : </label>
              <div className="bg-slate-100 p-2 ">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Enter Email "
                  onChange={handleOnChange}
                  className="w-full h-full  outline-none bg-transparent "
                />
              </div>
            </div>
            <div>
              <label htmlFor="">Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  name="password"
                  value={data.password}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password "
                  onChange={handleOnChange}
                  className="w-full h-full  outline-none bg-transparent display-none"
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor=""> Confirm Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  name="confirmPassword"
                  value={data.confirmPassword}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter Confirm Password "
                  onChange={handleOnChange}
                  className="w-full h-full  outline-none bg-transparent display-none"
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setConfirmPassword((prev) => !prev)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-red-600 text-white  px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto  block mt-6 hover:bg-red-700">
              Sign Up
            </button>
          </form>
          <p className="my-5 ">
            Already have account ?{" "}
            <Link
              to={"/login"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Login{" "}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
