import React, { useContext, useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summaryapi from "../common";
import toast from "react-hot-toast";
import Context from "../context";
// import fetchUserDetails from "../App";
function Login() {
  const [showPassword, setPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  // console.log(generalContext);
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
    const dataResponse = await fetch(summaryapi.signIn.url, {
      method: summaryapi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await dataResponse.json();
    console.log(dataApi);
    if (dataApi.success) {
      toast.success("Logged in Successfully");

      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    } else toast.error("Chcek Credentials");
  };
  // console.log(data);
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto ">
          <div className="h-20 w-20 mx-auto ">
            <img src={loginIcons} alt="login icons" />
          </div>
          <form
            action=""
            className="pt-6 flex flex-col gap-2"
            onSubmit={handleSubmit}
          >
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
                  className="w-full h-full  outline-none bg-transparent "
                />
                <div
                  className="cursor-pointer text-lg"
                  onClick={() => setPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                {" "}
                Forgot password
              </Link>
            </div>
            <button className="bg-red-600 text-white  px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto  block mt-6 hover:bg-red-700">
              Login
            </button>
          </form>
          <p className="my-5 ">
            Don't have account ?{" "}
            <Link
              to={"/sign-up"}
              className="text-red-600 hover:text-red-700 hover:underline"
            >
              Sign In{" "}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
