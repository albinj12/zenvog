const { GraphQLScalarType } = require('graphql')

const Date = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.Date) {
        return parseInt(ast.value); // ast value is always in string format
      }
      return null;
    },
  }),
}

module.exports = Date;