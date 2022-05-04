// Construct a schema, using GraphQL schema language
const types = `
  type Movie {
    title: String!,
    genres: [String!]!
    director: String!
    actors: [String!]!
    plot: String!
    id: String!
    runtime: String!
    year: String!
  }
  
  type Query {
    movies: [Movie],
    moviesById(id: ID!): Movie,
  }
`;

export default types