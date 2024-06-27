import React, { useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINRCurrency from "../Helpers/displayINRCurrency";

function AdminProductCard({ product, fetchData }) {
  const [editProduct, setEditProduct] = useState(false);
  return (
    <div className="bg-white p-4 rounded ">
      <div className="w-40 ">
        <div className="w-32 h-32 flex justify-center items-center ">
          <img
            src={product?.productImage[0]}
            className="mx-auto object-fill h-full"
          />
        </div>

        <h1 className="font-bold text-ellipsis line-clamp-2">
          {product.productName}
        </h1>
        <div>
          <p className="font-bold">{displayINRCurrency(product.selling)}</p>
          <div
            className="w-fit  ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full  hover:text-white cursor-pointer"
            onClick={() => setEditProduct(true)}
          >
            <MdOutlineEdit></MdOutlineEdit>
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          fetchData={fetchData}
          product={product}
          onClose={() => setEditProduct()}
        ></AdminEditProduct>
      )}
    </div>
  );
}

export default AdminProductCard;
