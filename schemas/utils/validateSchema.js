module.exports = (obj, schema) => {
  const { requestSchemas, responseSchemas } = require('../index')
  const createSchemaValidator = require('./createSchemaValidator')

  const schemas = { ...responseSchemas, ...requestSchemas }
  const shemaValidator = createSchemaValidator(schemas)
  const v = shemaValidator.validate(obj, { $ref: schema })
  const errors = v.errors
  if (errors && errors.length > 0) {
    const errorsArr = []
    errors.forEach(err => errorsArr.push(err))

    if (process.env.NODE_ENV === 'development') console.error(errors)

    throw (errorsArr)
  }
}
