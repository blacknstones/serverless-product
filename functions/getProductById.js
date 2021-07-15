const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.DB_KEY,
});

exports.handler = (event, context) => {
  const id = event.path.match(/([^\/]*)\/*$/)[0];
  console.log(`Function 'product-read' invoked. Read id: ${id}`)
  return client.query(q.Get(q.Ref(`classes/products/${id}`)))
  .then((response) => {
    console.log("success", response)
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  }).catch((error) => {
    console.log("error", error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  })
}