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
    const { docId, name, price, stock_qty } = event.body
    let updatedData = { name, price, stock_qty }

    if (!docId || (docId && docId.length === 0)) {
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({
          result: "failed",
          message: "Invalid Doc-id",
        }),
      })
    }
    Object.entries(updatedData).forEach(d => {
      if (!d[1] || d[1] === "" || d[1] === null) {
        delete updatedData[d[0]]
      }
    })
    const docRef = query.Ref(query.Collection("products"), `${docId}`)

    var result = await client.query(
      query.Update(docRef, {
        data: {
          ...updatedData,
        },
      })
    )

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
