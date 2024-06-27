import React, { useState } from "react";
import ROLE from "../common/role";
import { IoClose } from "react-icons/io5";
import summaryapi from "../common/index";
import { toast } from "react-hot-toast";
const ChangeUserRole = ({ name, userId, email, role, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);
  const handleOnChange = (event) => {
    setUserRole(event.target.value);
    console.log(event.target.value);
  };
  console.log(" Hello :", name, userId, email, role);
  const updateUserRole = async () => {
    const fetchResponse = await fetch(summaryapi.updateUser.url, {
      method: summaryapi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });
    console.log("fetchResponse", fetchResponse);
    const responseData = await fetchResponse.json();
    console.log("Hello", responseData);
    if (responseData.success) {
      toast.success("Profile Updated");
      onClose();
      callFunc();
    }
    console.log("Updated Role :", responseData);
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className=" mx-auto bg-white shadow-md p-4 w-full max-w-sm ">
        <button className="block ml-auto " onClick={onClose}>
          <IoClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">ChangeUSer Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role : </p>
          <select className="border px-4 py-1 " onChange={handleOnChange}>
            <option value="SELECT ROLE">SELECT ROLE</option>
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <button
          onClick={updateUserRole}
          className="w-fit mx-auto block border py-1 px-3 rounded-full bg-red-500 text-white hover:bg-red-700"
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
