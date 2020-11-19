const express = require('express');
require('dotenv').config({path:'.env'});
const { ApolloServer } = require('apollo-server-express');

//Create server with ApolloServer
const server = new ApolloServer({
    modules: [
        // require('./GraphQL/products'),
        require('./GraphQL/categories')
    ]
});

const app = express();
server.applyMiddleware({ app });

//Handle URL not found
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

//Start APP on Port 4000
app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000/graphql`));