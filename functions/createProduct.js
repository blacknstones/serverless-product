const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.DB_KEY,
});

exports.handler = async (event, context) => {
  const data = await JSON.parse(event.body);

  console.log(`Creating product...`, data);

  const product = {
    data,
  };

  return client
    .query(q.Create(q.Ref('classes/products'), product))
    .then(res => {
      console.log(`Success!`, res);
      return {
          statusCode: 201,
          body: JSON.stringify(res)
      }
    }).catch(err => {
        console.log(`Error!`, err);
        return {
            statusCode: 400,
            body: JSON.stringify(err)
        }
    });
};
