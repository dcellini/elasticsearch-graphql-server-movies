import getAllSchema from "../ElasticSearch/schema/index.js"
import getByIdSchema from "../ElasticSearch/schema/getByIdSchema.js"

// The root provides a resolver function for each API endpoint
const resolvers = {
    Query: {
      movies: async (_, __, { dataSources }) => {
        const result = await dataSources.ElasticSearchClient({...getAllSchema});
        const results = result.hits.hits;
        const movies = results.map(result => ( {id: result._id, ...result._source} ));
        return movies;
      },
      moviesById: async (_, args, { dataSources }) => {
        const result = await dataSources.ElasticSearchClient({...getByIdSchema(args.id)});
        const movie = result.hits.hits[0];
        return {id: movie._id, ...movie._source};
      },
    }
  };
  export default resolvers