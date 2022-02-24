import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import {fileURLToPath} from 'url';
import {ApolloServer} from "apollo-server-express";
import ApiElasticSearchClient from "./apiElasticSearchClient.js";
import madeExecutableSchema from "./server.graphql.js";

const app = express();

// PORT
const PORT = process.env.PORT || 3050;

// The import.meta object exposes context-specific metadata to a JavaScript module. It contains information about the module, like the module's URL.
const __filename = fileURLToPath(import.meta.url);

// e.g. "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

let apolloServer = null;

async function startServer() {
    apolloServer = new ApolloServer({
      schema: madeExecutableSchema,
      playground: true,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}

startServer();

const server = new ApolloServer({
  schema: madeExecutableSchema,
  playground: true,
});

// TODO Use the BodyParser as a middleware
app.use(bodyParser.json());

// TODO Set port for the app to listen on
app.set('port', PORT);

// TODO Set path to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// TODO Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method");
  next();
});

// Define the `/search` route that should return elastic search results
app.get('/search', ApiElasticSearchClient);

// server.applyMiddleware({app});

app.listen(PORT, function () {
  console.log(`Express server listening on port :${PORT}${server.graphqlPath}`);
});
