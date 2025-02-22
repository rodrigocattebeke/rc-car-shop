export const getProducts = async () => {
  try {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${import.meta.VITE_SHEET_ID}/values/products?key=${import.meta.env.VITE_API_KEY}`);

    if (!response.ok) {
      throw Error("Ocurrio un error al traer los productos");
    }

    const data = await response.json();
    const products = data.values.slice(1); //separate for products
    const props = data.values.slice(0, 1)[0]; //separate for props

    const ordenedArray = products.map((productInfo) => {
      let productObject = {};
      for (let i = 0; i < props.length; i++) {
        let info = productInfo[i];

        //Parse to integer the price|stock|id
        if (props[i] == "price" || props[i] == "stock" || props[i] == "productId") {
          info = parseInt(info);
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
