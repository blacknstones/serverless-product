import axios from 'axios';
import { useState } from 'react';
import './App.css';
import uuid from ('uuid');

const test = {
    id: uuid(),
    name: 'Computer',
    description: 'It computes things',
    price: 2999
  };

const App = () => {
  const [products, setProducts] = useState([]);

  const addProduct = data => {
    axios.post('/.netlify/functions/createProduct', data)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }
  
  const getProductList = async () => {
    const productList = await axios.get('/.netlify/functions/getAllProducts');
    console.log(productList);
    setProducts(productList);
  }
 

  return (
    <div className="App">
      <h1>Add products to db</h1>
      <button onClick={() => addProduct(test)}>Add product</button>
      <button onClick={() => getProductList()}>Get all products</button>
      {
        products &&
        products.map(el => 
        (<div key={Date.now()}>
          <p>{el.name}</p>
          <p>{el.description}</p>
          <p>{el.price}</p>

        </div>)
        )
      }
    </div>
  );
}

export default App;
