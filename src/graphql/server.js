import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import {fileURLToPath} from 'url';
import {ApolloServer} from "apollo-server-express";
import ApiElasticSearchClient from "../ElasticSearch/apiElasticSearchClient.js";
import {makeExecutableSchema} from 'graphql-tools';
import types from './types.js';
import resolvers from './resolvers.js';
import ElasticSearchClient from "../ElasticSearch/elasticSearchClient.js"
import getAllSchema from "../ElasticSearch/schema/index.js";
import getByIdSchema from "../ElasticSearch/schema/getByIdSchema.js";

const app = express();

// PORT
const PORT = process.env.PORT || 3050;

// The import.meta object exposes context-specific metadata to a JavaScript module. It contains information about the module, like the module's URL.
const __filename = fileURLToPath(import.meta.url);

// e.g. "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

const madeExecutableSchema = makeExecutableSchema({
  "typeDefs": [types],
  "resolvers": resolvers
});

const server = new ApolloServer({
  schema: madeExecutableSchema,
  playground: true,
});

let apolloServer = null;

const startServer = async () => {
    apolloServer = new ApolloServer({
      schema: madeExecutableSchema,
      playground: true,
      // Pass in ElasticSearchClient so we can get it off dataSources in our resolvers
      dataSources: () => ({
        ElasticSearchClient,
      })
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}

startServer();

// TODO Use the BodyParser as a middleware
app.use(bodyParser.json());

// TODO Set port for the app to listen on
app.set('port', PORT);

// TODO Set path to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// TODO Enable CORS
app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method");
  next();
});

// Define the `/search` route that should return elastic search results
app.get('/movies', ((req, res) => ApiElasticSearchClient(res, getAllSchema)));
app.get('/movies/:movieId', ((req, res) => ApiElasticSearchClient(res, getByIdSchema(req.params.movieId))));
app.delete('/movies/delete/:movieId', ((req, res) => ApiElasticSearchClient(res, getByIdSchema(req.params.movieId))));

// server.applyMiddleware({app});

app.listen(PORT, () => {
  console.log(`Express server listening on port :${PORT}${server.graphqlPath}`);
});
