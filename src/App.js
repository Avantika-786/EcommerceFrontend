import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import summaryapi from "./common/index";
import Context from "./context/index";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProduct, setCartProduct] = useState(0);
  const fetchUserDetails = async () => {
    const response = await fetch(summaryapi.current_user.url, {
      method: summaryapi.current_user.method,
      credentials: "include",
    });

    const dataApi = await response.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };
  const fetchUserAddToCart = async () => {
    const response = await fetch(summaryapi.countProduct.url, {
      method: summaryapi.countProduct.method,
      credentials: "include",
    });

    const dataApi = await response.json();

    // console.log("Data Api ", dataApi);
    setCartProduct(dataApi?.data?.count);
  };
  useEffect(() => {
    fetchUserDetails();

    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{ fetchUserDetails, cartProduct, fetchUserAddToCart }}
      >
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
          <Toaster position="top-center" reverseOrder={false} />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
