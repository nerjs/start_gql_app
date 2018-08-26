import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';


// const networkInterface = createNetworkInterface({
// 	uri: `http:${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${process.env.GRAPHQL_ENDPOINT}`
// });


const client = new ApolloClient({
	uri: `${process.env.SERVER_PROTOKOL}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/${process.env.GRAPHQL_ENDPOINT}`,
	credentials: 'include'
	// credentials: 'same-origin'
});

// console.log(client)

export default ({ children }) => (
	<ApolloProvider client={client} >
		{children}
	</ApolloProvider>
)