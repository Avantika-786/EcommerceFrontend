import React, { useEffect, useState } from "react";
import UploadProduct from "../Components/UploadProduct";
import summaryapi from "../common";
import AdminProductCart from "../Components/AdminProductCard";
function AllProducts() {
  const [openUploadProduct, setopenUploadProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const fetchAllProducts = async () => {
    const response = await fetch(summaryapi.getProduct.url, {
      method: summaryapi.getProduct.method,
    });

    const dataResponse = await response.json();
    console.log();
    setAllProducts(dataResponse?.data || []);
  };
  useEffect(() => {
    fetchAllProducts();
  }, []);
  return (
    <div>
      <div className="bg-white py-2 px-2 flex justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          onClick={() => setopenUploadProduct(true)}
          className="border border-red-600 hover:bg-red-600 hover:text-white translate-all  py-2 px-4 rounded-full"
        >
          Upload Product{" "}
        </button>
      </div>
      {/* All Products */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll">
        {allProducts.map((product, index) => {
          return (
            <AdminProductCart
              product={product}
              key={index + "allProducts"}
              fetchData={fetchAllProducts}
            ></AdminProductCart>
          );
        })}
      </div>
      {/* Upload Product Component */}
      {openUploadProduct && (
        <UploadProduct
          fetchData={fetchAllProducts}
          onClose={() => setopenUploadProduct(false)}
        ></UploadProduct>
      )}
    </div>
  );
}

export default AllProducts;
