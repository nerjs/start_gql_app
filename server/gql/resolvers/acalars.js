import { GraphQLScalarType } from 'graphql';

import Logger from 'log'

const log = Logger('gql:scalar')

export default {
	Date: new GraphQLScalarType({
	  name: 'Date',
	  description: 'js Date type. for client return Number (Date.getTime())',
	  serialize(value) {
	    // Implement your own behavior here by setting the 'result' variable
	    return value.getTime ? value.getTime() : null;
	  },
	  parseValue(value) {
	  	return new Date(value)
	  },
	  parseLiteral(ast) {
	    switch (ast.kind) {
	      // Implement your own behavior here by returning what suits your needs
	      // depending on ast.kind
	    }
	  }
	})
}