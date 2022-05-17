const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');

//Initializing Database
const db = require('./config/connection');

//Initializing Server and Express App
const PORT = process.env.PORT || 3001
const app = express();

//Initializing Apollo Server
const server = new ApolloServer ({
    typeDefs,
    resolvers,
    context: authMiddleware
})

//Middleware
server.applyMiddleware({ app });
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Path File when Application is deployed
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

//Path File when working from Local Host
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})

//Running Database on Port And Graph QL on added URL
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
})