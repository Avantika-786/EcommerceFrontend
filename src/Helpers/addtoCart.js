import summaryapi from "../common";
import { toast } from "react-hot-toast";
const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();
  const response = await fetch(summaryapi.addToCart.url, {
    method: summaryapi.addToCart.method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      productId: id,
    }),
  });
  const responseData = await response.json();
  if (responseData.success) {
    console.log("Hello");
    toast.success(responseData.message);
  }
  if (responseData.error) {
    toast.error(responseData.message);
  }
  return responseData;
};
export default addToCart;
