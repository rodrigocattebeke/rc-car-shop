import { getDirectImgURL } from "../helpers/getDirectImgUrl";

export const getProducts = async () => {
  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${import.meta.env.VITE_GOOGLE_SHEET_ID}/values/products?key=${import.meta.env.VITE_GOOGLE_API_KEY}`);

    if (!response.ok) {
      throw Error("Ocurrio un error al traer los productos");
    }

    const data = await response.json();
    const products = data.values.slice(1); //separate for products
    const props = data.values.slice(0, 1)[0]; //separate for props

    const ordenedArray = products.map((productInfo) => {
      let productObject = {}; //Create a empty product object

      for (let i = 0; i < props.length; i++) {
        let info = productInfo[i]; //Info is the product prop value.

        //Parse to integer the price | stock | id of the product
        if (props[i] == "price" || props[i] == "stock" || props[i] == "productId") {
          info = parseInt(info);
        }

        //tranform the google drive url to direct url
        if (props[i] == "image") {
          info = getDirectImgURL(info);
        }

        //Create the product object
        productObject = {
          ...productObject,
          [props[i]]: info,
        };
      }
      return productObject;
    });

    return {
      isSuccess: true,
      data: ordenedArray,
    };
  } catch (err) {
    return {
      isSuccess: false,
      error: err,
    };
  }
};
