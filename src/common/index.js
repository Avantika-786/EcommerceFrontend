const summaryapi = {
  signUp: {
    url: `${process.env.REACT_APP_BASE_URL}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${process.env.REACT_APP_BASE_URL}/api/login`,
    method: "post",
  },
  current_user: {
    url: `${process.env.REACT_APP_BASE_URL}/api/userDetails`,
    method: "get",
  },
  logout: {
    url: `${process.env.REACT_APP_BASE_URL}/api/userLogout`,
    method: "get",
  },
  allUsers: {
    url: `${process.env.REACT_APP_BASE_URL}/api/allUsers`,
    method: "get",
  },
  updateUser: {
    url: `${process.env.REACT_APP_BASE_URL}/api/updateUser`,
    method: "post",
  },
  uploadProduct: {
    url: `${process.env.REACT_APP_BASE_URL}/api/uploadProduct`,
    method: "post",
  },
  getProduct: {
    url: `${process.env.REACT_APP_BASE_URL}/api/getProduct`,
    method: "get",
  },
  updateProduct: {
    url: `${process.env.REACT_APP_BASE_URL}/api/updateProduct`,
    method: "post",
  },
  getCategoryProduct: {
    url: `${process.env.REACT_APP_BASE_URL}/api/getCategoryProduct`,
    method: "get",
  },
  categoryProduct: {
    url: `${process.env.REACT_APP_BASE_URL}/api/categoryProduct`,
    method: "post",
  },
  productDetails: {
    url: `${process.env.REACT_APP_BASE_URL}/api/productDetails`,
    method: "post",
  },
  addToCart: {
    url: `${process.env.REACT_APP_BASE_URL}/api/addToCart`,
    method: "post",
  },
  countProduct: {
    url: `${process.env.REACT_APP_BASE_URL}/api/countProduct`,
    method: "get",
  },
  cartViewProduct: {
    url: `${process.env.REACT_APP_BASE_URL}/api/cartViewProduct`,
    method: "get",
  },
  updateCartProduct: {
    url: `${process.env.REACT_APP_BASE_URL}/api/updateCartProduct`,
    method: "post",
  },
  deleteCartProduct: {
    url: `${process.env.REACT_APP_BASE_URL}/api/deleteCartProduct`,
    method: "post",
  },
  searchProduct: {
    url: `${process.env.REACT_APP_BASE_URL}/api/searchProduct`,
    method: "get",
  },
  filterProduct: {
    url: `${process.env.REACT_APP_BASE_URL}/api/filterProduct`,
    method: "post",
  },
};
console.log(process.env.REACT_APP_BASE_URL);
console.log(summaryapi);

export default summaryapi;
