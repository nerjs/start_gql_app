const { 
	SERVER_HOST, 
	SERVER_PORT, 
	CLIENT_HOST, 
	CLIENT_PORT, 
	GRAPHQL_ENDPOINT, 
	GRAPHIQL_ENDPOINT
} = process.env

export default (req, res, next) => {
	res.render('index',{ 
		SERVER_HOST, 
		SERVER_PORT, 
		CLIENT_HOST:'dd', 
		CLIENT_PORT, 
		GRAPHQL_ENDPOINT, 
		GRAPHIQL_ENDPOINT
	})


}