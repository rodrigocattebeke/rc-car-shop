import { apiUrls } from "../config/apiUrls";
import simpleFetch from "../helpers/simpleFetch";

export const fetchProductsByCategory = async (category) => {
  return await simpleFetch(`${apiUrls.categoryDetail(`${category}`)}`);
};
