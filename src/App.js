import React, { useState } from 'react';
// import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { addProduct, getProductList, addToCart } from './utils/api';
import Login from './pages/Login';

const test = {
  id: uuidv4(),
  name: 'Computer',
  description: 'It computes things',
  price: 2999,
};

const App = () => {
  const [products, setProducts] = useState([]);
  //const [product, setProduct] = useState({});
  const [user, setUser] = useState('');
  const [cart, setCart] = useState({});

  const handleUserLogin = name => {
    console.log(name, 'logged in!')
    setUser(name);
  }

  const onAddProduct = () => {
    addProduct(test);
  }

  const onGetProducts = async () => {
    const allProducts = await getProductList();
    setProducts(allProducts);
  }

/*   const onGetProductById = async (id) => {
    const productDetail = await getProductById(id);
    setProduct(productDetail);
  } */

  const onAddToCart = async (cartName, product) => {
    console.log('onAddToCart', product);
    const newCart = await addToCart(cartName, product);
    console.log('newCart', newCart);
    setCart(newCart);
  }

  //onClick={() => {onGetProductById(el.data.id)}}

  return (
      <div className='App'>
        <Login handleUserLogin={handleUserLogin} />
        <h1>Add products to db</h1>
        <button onClick={onAddProduct}>Add product</button>
        <button onClick={onGetProducts}>Get all products</button>
        {products &&
          products.map(el => (
            <div key={el.data.id}>
              <p>{el.data.id}</p>
              <p>{el.data.name}</p>
              <p>{el.data.description}</p>
              <p>{el.data.price}</p>
              <button onClick={() => onAddToCart(user, el.data)}>Add to cart</button>
            </div>
          ))}

          <div>{cart && 
          <div>
            <p>{cart.name}</p>
            <p>{cart.totalNumberOfItems}</p>
            <p>{cart.totalPrice}</p>
            </div>}</div>
      </div>
  );
};

export default App;
