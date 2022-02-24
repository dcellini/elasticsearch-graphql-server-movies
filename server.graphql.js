import ElasticSearchClient from "./elasticSearchClient.js"
import elasticSearchSchema from "./schema/index.js";
import {makeExecutableSchema} from 'graphql-tools';

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type inOthers {
    name: String!
    quantity: String!
    uuid: String!
  }
  
  type inStocks {
    name: String!
    quantity: String!
    uuid: String!
  }
  
  type Product {
    name: String
    default_image: String
    new_product: Boolean
    brand: String!
    promos: [String]
    article: String
    promotion: Boolean
    price: String
    in_stocks: [inStocks]
    in_others: inOthers
    in_waiting: inOthers
    currency_name: String 
  }

  type Query {
    products: [Product]
  }
`;

// The root provides a resolver function for each API endpoint
const resolvers = {
  Query: {
    products: () => new Promise((resolve, reject) => {
      ElasticSearchClient({...elasticSearchSchema})
        .then(r => {
          let _source = r['hits']['hits'];
              _source.map((item, i) => _source[i] = item._source);

          resolve(_source);
        });
    }),
  }
};

const madeExecutableSchema = makeExecutableSchema({
  "typeDefs": [typeDefs],
  "resolvers": resolvers
});

export default madeExecutableSchema;