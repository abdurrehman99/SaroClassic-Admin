export const SERVER_URL = "https://saroclassic-server.herokuapp.com";

export const ROUTES = {
  AdminLogin: `${SERVER_URL}/admin/login`,
  AdminPasswordChange: `${SERVER_URL}/admin/changePassword`,

  AddNewCategory: `${SERVER_URL}/admin/addNewCategory`,
  DeleteCategory: `${SERVER_URL}/admin/deleteCategory?name=`,

  GetAllCategories: `${SERVER_URL}/categories/all`,
  GetAllProducts: `${SERVER_URL}/products/all`,
};
