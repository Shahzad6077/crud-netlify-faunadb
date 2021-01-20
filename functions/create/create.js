// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const middy = require("middy")
const {
  jsonBodyParser,
  validator,
  httpErrorHandler,
  httpHeaderNormalizer,
} = require("middy/middlewares")

const faunaDB = require("faunadb")
const { checkMethod } = require("../Utils")
const query = faunaDB.query

const client = new faunaDB.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})
/* Normal lambda code */
const businessLogic = async (event, context, callback) => {
  // event.body has already been turned into an object by `jsonBodyParser` middleware
  try {
    const { name, price, stock_qty } = event.body
    if (
      !name ||
      !price ||
      !stock_qty ||
      (name && name.length === 0) ||
      (price && price === 0) ||
      (stock_qty && stock_qty === 0)
    ) {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          result: "failed",
          message: "Invalid body data",
        }),
      })
    }
    var result = await client.query(
      query.Create("products", {
        data: {
          name,
          price,
          stock_qty,
        },
      })
    )

    console.log(result)

    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        result: "success",
        data: {
          id: result.ref.id,
          ts: result.ts,
          ...result.data,
        },
      }),
    })
  } catch (err) {
    return callback(err)
  }
}

exports.handler = middy(businessLogic)
  .use(checkMethod("POST"))
  .use(httpHeaderNormalizer())
  // parses the request body when it's a JSON and converts it to an object
  .use(jsonBodyParser())
  // handles common http errors and returns proper responses
  .use(httpErrorHandler())
