const faunadb = require('faunadb');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.DB_KEY,
});

/* exports.handler = async (event, context) => {
    try {
       /*  const products = await q.Map(
            q.Paginate(Documents(Collection('products'))),
            q.Lambda(x => q.Get(x))
          )
          console.log(products);
          return client
          .query(q.Map(
              q.Paginate(Documents(Collection('products'))),

          ))
          return {
              statusCode: 200,
              body: JSON.stringify(res)
          }
    }
    catch(err) {
        console.log(err);
    } 

} */

exports.handler = async (event, context) => {
  console.log("Function `getAllProducts` invoked")
  return client.query(q.Paginate(q.Match(q.Ref("indexes/all_products"))))
  .then((response) => {
    const productRefs = response.data
    console.log("Product refs", productRefs)
    console.log(`${productRefs.length} products found`)
    // create new query out of todo refs. http://bit.ly/2LG3MLg
    const getAllProductDataQuery = productRefs.map((ref) => {
      return q.Get(ref)
    })
    // then query the refs
    return client.query(getAllProductDataQuery).then((ret) => {
      return {
        statusCode: 200,
        body: JSON.stringify(ret)
      }
    })
  }).catch((error) => {
    console.log("error", error)
    return {
      statusCode: 400,
      body: JSON.stringify(error)
    }
  })
}