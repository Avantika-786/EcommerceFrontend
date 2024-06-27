const { default: summaryapi } = require("../common");

const fetchCategoryWiseProduct = async (category) => {
  const response = await fetch(summaryapi.categoryProduct.url, {
    method: summaryapi.categoryProduct.method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      category: category,
    }),
  });
  const dataResponse = await response.json();
  return dataResponse;
};
export default fetchCategoryWiseProduct;
