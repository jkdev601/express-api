const { Validator } = require('jsonschema')

module.exports = (schemas) => {
  const validator = new Validator()
  for (const schema of Object.values(schemas)) {
    validator.addSchema(schema)
  }

  return validator
}
