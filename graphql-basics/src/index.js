import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID


// Type definitions (schema)
const typeDefs = `
  type Query {
    title: String!
    price: Float!
    relaseYear: Int
    rating: Float
    inStock: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    title () {
      return "Audio system 5.1";
    },
    price () {
      return 4299.98;
    },
    relaseYear () {
      return 2015;
    },
    rating () {
      return 4.5;
    },
    inStock () {
      return true;
    }
  }
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up!')
})