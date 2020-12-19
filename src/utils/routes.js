export const SERVER_URL = "https://saroclassic-server.herokuapp.com";
// export const SERVER_URL = "http://localhost:5000";

export const ROUTES = {
  //Cloudinary img URL
  ImageUpload: "https://api.cloudinary.com/v1_1/ebad/image/upload",
  //Login Route
  AdminLogin: `${SERVER_URL}/admin/login`,

  //Protected Routes
  AdminPasswordChange: `${SERVER_URL}/admin/changePassword`,
  AddNewCategory: `${SERVER_URL}/admin/addNewCategory`,
  DeleteCategory: `${SERVER_URL}/admin/deleteCategory?name=`,
  AddNewProduct: `${SERVER_URL}/admin/addNewProduct`,
  DeleteProduct: `${SERVER_URL}/admin/deleteProduct?id=`,
  FeatureProduct: `${SERVER_URL}/admin/featureProduct?id=`,
  OutOfStockProduct: `${SERVER_URL}/admin/outOfStockProduct?id=`,

  //Public routes
  GetAllProducts: `${SERVER_URL}/products/all`,
  GetAllCategories: `${SERVER_URL}/categories/all`,

  GetAllOrders: `${SERVER_URL}/orders/all`,
  GetUserOrders: `${SERVER_URL}/orders/singleUserOrders?id=`,
  ChangeOrderStatus: `${SERVER_URL}/orders/changeStatus`,
  GetAllUsers: `${SERVER_URL}/user/all`,
  DeleteUser: `${SERVER_URL}/user?id=`,
};
