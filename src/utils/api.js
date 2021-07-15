import axios from 'axios';

const addProduct = async data => {
  try {
    const res = axios.post('/.netlify/functions/createProduct', data);
    return res;
  } catch (err) {
    console.log(err);
  }
};

const getProductList = async () => {
  try {
    const productList = await axios.get('/.netlify/functions/getAllProducts');
    return productList.data;
  } catch (err) {
    console.log(err);
  }
};

const getProductById = async id => {
  try {
    const product = await axios.get(`/.netlify/functions/getProductById/${id}`);
    return product;
  } catch (err) {
    console.log(err);
  }
};

const addToCart = async (cartName, product) => {
  try {
    const res = axios.post(`/.netlify/functions/addToCart/${cartName}`, {
      name: product.name,
      price: product.price,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export { addProduct, getProductList, getProductById, addToCart };
