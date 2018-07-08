
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';


import typeDefs from '../schema';
import resolvers from '../resolver';
import Logger from 'log'

import user from './schemas/user.gql'

const log = Logger('gql:index')

log.debug(user)

const {
	GRAPHQL_ENDPOINT,
	GRAPHIQL_ENDPOINT
} = process.env



const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
}); 

export default app => {

	app.use(`/${GRAPHQL_ENDPOINT}`, graphqlExpress({ schema }));

	app.use(`/${GRAPHIQL_ENDPOINT}`, graphiqlExpress({ endpointURL: `/${GRAPHQL_ENDPOINT}` }));

	log.info('graphql started')
}