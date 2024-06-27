import React from "react";
import CategoryList from "../Components/CategoryList";
import BannerProduct from "../Components/BannerProduct";
import HorizontalCardProduct from "../Components/HorizontalCardProduct";
import VerticalCardProduct from "../Components/VerticalCardProduct";

function Home() {
  return (
    <div>
      <CategoryList></CategoryList>
      <BannerProduct></BannerProduct>
      <HorizontalCardProduct
        category={"airpodes"}
        heading={"Top's Airpodes"}
      ></HorizontalCardProduct>
      <HorizontalCardProduct
        category={"camera"}
        heading={"Top's Cameras"}
      ></HorizontalCardProduct>
      <VerticalCardProduct
        category={"mobiles"}
        heading={"Top's Mobiles"}
      ></VerticalCardProduct>
      <VerticalCardProduct
        category={"mouse"}
        heading={"Top's Mobiles"}
      ></VerticalCardProduct>
    </div>
  );
}

export default Home;
