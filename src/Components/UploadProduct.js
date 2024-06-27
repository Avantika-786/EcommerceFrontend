import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import productcategory from "../Helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../Helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import summaryapi from "../common/index";
import toast from "react-hot-toast";
const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    selling: "",
  });
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState("");
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleUploadProduct = async (event) => {
    const file = event.target.files[0];
    // setuploadProductImageInput(file.name);
    // console.log(file);
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
    // console.log("Image upload ", uploadImageCloudinary);
  };
  const handleDeleteProductImage = async (index) => {
    console.log("index", index);
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };
  // submit orupload product;
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(data);
    const response = await fetch(summaryapi.uploadProduct.url, {
      method: summaryapi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData();
    }
    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };
  return (
    <div className="fixed bg-slate-200 bg-opacity-35 h-full w-full top-0 left-0 right-0 bottom-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg"> Upload Product</h2>
          <div
            className="w-fit ml-auto text-3xl hover:text-red-600 cursor-pointer"
            onClick={onClose}
          >
            <IoClose></IoClose>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          action=""
          className="grid p-4 gap-3 overflow-y-scroll h-full pb-5"
        >
          <label htmlFor="productName">Product Name : </label>
          <input
            type="text"
            name="productName"
            id="productName"
            placeholder="Enter Product Name"
            value={data.productName}
            onChange={handleOnChange}
            className="p-2  bg-slate-100 border rounded "
            required
          />
          <label htmlFor="brandName">Product Brand : </label>
          <input
            type="text"
            name="brandName"
            id="brandName"
            placeholder="Enter Brand Name"
            value={data.brandName}
            onChange={handleOnChange}
            className="p-2  bg-slate-100 border rounded "
            required
          />
          <label htmlFor="category">Product Category : </label>
          <select
            onChange={handleOnChange}
            value={data.category}
            name="category"
            className="p-2  bg-slate-100 border rounded "
            required
          >
            <option value={""}>Select Category</option>
            {productcategory.map((el, index) => {
              return (
                <option value={el.value} key={el.value + index}>
                  {el.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage">Product Image : </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex items-center justify-center flex-col gap-2">
                <span className="text-4xl">
                  <FaCloudUploadAlt />
                </span>
                <p className="text-sm">Upload Product Image</p>
                <input
                  type="file"
                  id="uploadImageInput"
                  onChange={handleUploadProduct}
                  className="hidden"
                />
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center flex-ro gap-2">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                      />
                      <div className="absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer">
                        <MdDelete
                          onClick={() => handleDeleteProductImage(index)}
                        ></MdDelete>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs ">
                *Please Upload Product image
              </p>
            )}
          </div>
          <label htmlFor="price">Price : </label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter Price"
            value={data.price}
            onChange={handleOnChange}
            className="p-2  bg-slate-100 border rounded "
            required
          />
          <label htmlFor="selling">Selling Price : </label>
          <input
            type="number"
            name="selling"
            id="selling"
            placeholder="Enter Selling Price"
            value={data.selling}
            onChange={handleOnChange}
            className="p-2  bg-slate-100 border rounded "
            required
          />
          <label htmlFor="description" className="mt-3">
            Description :{" "}
          </label>
          <textarea
            name="description"
            id=""
            rows={3}
            className="h-28 bg-slate-100 border resize-none p-1"
            placeholder="Enter Product Description"
            value={data.description}
            onChange={handleOnChange}
            required
          ></textarea>

          <button className="px-3 py-1 bg-red-600 text-white mb-2 hover:bg-red-700 ">
            Upload Product
          </button>
        </form>
      </div>
      {/* Display  Image  Full Screen*/}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imageUrl={fullScreenImage}
        ></DisplayImage>
      )}
    </div>
  );
};

export default UploadProduct;
