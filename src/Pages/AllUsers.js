import React, { useEffect, useState } from "react";
import summaryapi from "../common";
import toast from "react-hot-toast";
import moment from "moment";
import { MdOutlineEdit } from "react-icons/md";
import ChangeUserRole from "../Components/ChangeUserRole";
function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setupdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });
  const fetchAllUsers = async () => {
    const fetchData = await fetch(summaryapi.allUsers.url, {
      method: summaryapi.allUsers.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();
    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
    // console.log(dataResponse);
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="pb-4 bg-white">
      <table className="w-full userTable ">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((el, index) => {
            return (
              <tr key={el._id}>
                <td>{index + 1}</td>
                <td>{el?.name}</td>
                <td>{el?.email}</td>
                <td>{el?.role}</td>
                <td>{moment(el?.createdAt).format("l")}</td>
                <td>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white "
                    onClick={() => {
                      setupdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdOutlineEdit />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        ></ChangeUserRole>
      )}
    </div>
  );
}

export default AllUsers;
