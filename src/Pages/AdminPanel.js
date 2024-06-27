import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LuUserCircle2 } from "react-icons/lu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";
function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  // const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden  ">
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex flex-col justify-center  items-center">
          <div className="text-5xl cursor-pointer relative flex justify-center ">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                alt={user?.name}
                className="w-20 h-20 rounded-full"
              />
            ) : (
              <LuUserCircle2 />
            )}
          </div>
          <p className="capitalize font-semibold text-lg">{user?.name}</p>
          <p className="text-sm ">{user?.role}</p>
        </div>
        <div className="p-4 ">
          <nav className="flex flex-col">
            <Link
              to={"/admin-panel/all-users"}
              className="px-2 py-1 hover:bg-slate-100 "
            >
              All users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100 ">
              All Products
            </Link>
          </nav>
        </div>
      </aside>
      <main className="w-full p-2 h-full">
        <Outlet></Outlet>
      </main>
    </div>
  );
}

export default AdminPanel;
