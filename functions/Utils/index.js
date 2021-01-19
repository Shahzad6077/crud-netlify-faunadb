exports.checkMethod = methodName => ({
  before: (handler, next) => {
    console.log(handler.event.httpMethod)
    if (handler.event.httpMethod !== methodName) {
      next(new Error(`Request Method is invalid. (Only ${methodName})`))
    } else {
      next()
    }
  },
})
