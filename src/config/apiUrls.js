const API_BASE_URL = "https://fakestoreapi.com";

export const apiUrls = {
  categories: `${API_BASE_URL}/products/categories`,
  categoryDetail: (category) => `${API_BASE_URL}/products/category/${category}`,
  products: `${API_BASE_URL}/products`,
  productDetails: (id) => `${API_BASE_URL}/products/${id}`,
  saleProducts: `${API_BASE_URL}/products`,
};
