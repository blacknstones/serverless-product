const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.DB_KEY,
});

exports.handler = async (event, context) => {
  const name = event.path.match(/([^\/]*)\/*$/)[0];
  const product = await JSON.parse(event.body);
  let clientCart;

  try {
    clientCart = await client.query(q.Get(q.Ref(`classes/carts/${name}`)));
    console.log(`Adding to ${name}´s cart...`, product);
  } catch (err) {
    console.log(err);
  }

  // Create a cart if none exists:
  if (!clientCart) {
    const newCart = {
      data: {
        name,
        products: [product],
        totalNumberOfItems: 1,
        totalPrice: product.price,
      },
    };

    return client.query(q.Create(q.Ref('classes/carts'), newCart)).then(res => {
      console.log(`Cart created successfully!`, res);
      return {
        statusCode: 201,
        body: JSON.stringify(res),
      };
    });
  } else {
    const updatedCart = {
      data: {
        name,
        products: [...clientCart.data.products, product],
        totalNumberOfItems: clientCart.data.totalNumberOfItems + 1,
        totalPrice: clientCart.data.totalPrice + product.price,
      },
    };
    return client
      .query(q.Update(q.Ref(`classes/carts/${name}`), updatedCart))
      .then(res => {
        console.log('Cart updated succesfully', res);
        return {
          statusCode: 200,
          body: JSON.stringify(res),
        };
      });
  }
};
