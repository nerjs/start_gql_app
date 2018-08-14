
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { applyMiddleware } from 'graphql-middleware'
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import cors from 'cors'



import db from '../db'
import mdw from './middleware'
import Logger from 'log'



const log = Logger('gql:index')

// log(cors)
// log(JSON.stringify(new ResErr('user',NOT_FOUND,[{a:'qq',b:'aa'}])))

// log.debug(user)

const {
	GRAPHQL_ENDPOINT,
	GRAPHIQL_ENDPOINT
} = process.env
 

 

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')))

const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')))

// log(typeDefs)

const schemaBefore = makeExecutableSchema({
  typeDefs,
  resolvers,
}); 

const schema = applyMiddleware(
	schemaBefore,
	mdw
)

export default app => {

	app.use(`/${GRAPHQL_ENDPOINT}`,cors(), graphqlExpress(({ sess }) => ({ 
			schema, 
			context: {
				db,
				sess
			}
		})));

	app.use(`/${GRAPHIQL_ENDPOINT}`, graphiqlExpress({ endpointURL: `/${GRAPHQL_ENDPOINT}` }));

	log.info('graphql started')
}