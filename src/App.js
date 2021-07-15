import axios from 'axios';
import './App.css';

const test = {
    name: 'Computer',
    description: 'It computes things',
    price: 2999
  };

const App = () => {
  const addProduct = data => {
    axios.post('/.netlify/functions/createProduct', data)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
  }
  
  return (
    <div className="App">
      <h1>Add products to db</h1>
      <button onClick={() => addProduct(test)}>Add product</button>
    </div>
  );
}

export default App;
