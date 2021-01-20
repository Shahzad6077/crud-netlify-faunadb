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
const { Paginate, Match, Lambda, Map, Index, Get, Var } = faunaDB.query

const client = new faunaDB.Client({
  secret: process.env.FAUNADB_SERVER_SECRET,
})
/* Normal lambda code */
const businessLogic = async (event, context, callback) => {
  // event.body has already been turned into an object by `jsonBodyParser` middleware
  try {
    // const { docId } = event.queryStringParameters

    // if (!docId || `${docId}`.length === 0) {
    //   return callback(null, {
    //     statusCode: 400,
    //     body: JSON.stringify({
    //       result: "failed",
    //       message: "DocId is required.",
    //     }),
    //   })
    // }
    // const docRef = query.Ref(query.Collection("products"), `${docId}`)

    // var result = await client.query(query.Get(docRef))

    const docRefs = Paginate(Match(Index("get_products")))

    let results = await client.query(
      Map(docRefs, Lambda("ref", Get(Var("ref"))))
    )
    results = results.data.map(o => ({
      id: o.ref.id,
      ts: o.ts,
      ...o.data,
    }))
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        result: "success",
        data: results,
      }),
    })
  } catch (err) {
    return callback(err)
  }
}

exports.handler = middy(businessLogic)
  .use(checkMethod("GET"))
  .use(httpHeaderNormalizer())
  // parses the request body when it's a JSON and converts it to an object
  .use(jsonBodyParser())
  // handles common http errors and returns proper responses
  .use(httpErrorHandler())
