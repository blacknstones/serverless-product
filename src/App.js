import axios from 'axios';
import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const test = {
  id: uuidv4(),
  name: 'Computer',
  description: 'It computes things',
  price: 2999,
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  const addProduct = data => {
    axios
      .post('/.netlify/functions/createProduct', data)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  const getProductList = async () => {
    const productList = await axios.get('/.netlify/functions/getAllProducts');
    console.log(productList);
    setProducts(productList.data);
  };

  const getProductById = async id => {
    const productDetails = await axios.get('/.netlify/functions/getAllProducts', id);
    setProduct(productDetails);
    console.log(`The product you selected is ${productDetails}`);

  };

  return (
    <div className='App'>
      <h1>Add products to db</h1>
      <button onClick={() => addProduct(test)}>Add product</button>
      <button onClick={() => getProductList()}>Get all products</button>
      {products &&
        products.map(el => (
          <div key={el.data.id} onClick={() => getProductById(el.data.id)}>
            <p>{el.data.id}</p>
            <p>{el.data.name}</p>
            <p>{el.data.description}</p>
            <p>{el.data.price}</p>
          </div>
        ))}
    </div>
  );
};

export default App;
