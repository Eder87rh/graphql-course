import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID

// Demo User Data
const users = [{
  id: '1',
  name: "Eder",
  eder: "eder@example.com",
  age: 31
}, {
  id: '2',
  name: "Sarah",
  eder: "sarah@example.com"
}, {
  id: '3',
  name: "Mike",
  eder: "mike@example.com"
}];

// Demo Posts Data
const posts = [{
  id: "1",
  title: "Titulo 1",
  body: "Post Perrón",
  published: true,
  author: "1"
}, {
  id: "2",
  title: "Titulo 2",
  body: "Otro Perrón",
  published: true,
  author: "2"
}, {
  id: "3",
  title: "Titulo 3",
  body: "Sin comentarios",
  published: false,
  author: "3"
}];

// Type definitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String):[Post!]!
    me: User!
    getPost: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts:[Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, { query }, ctx, info) {
      if (query) {
        return users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
      } else {
        return users;
      }
    },
    posts(parent, { query }, ctx, info) {
      if (query) {
        return posts.filter(({ title, body }) => { 
          return  title.toLowerCase().includes(query.toLowerCase()) || 
                  body.toLowerCase().includes(query.toLowerCase())
        });
      } else {
        return posts;
      }
    },
    me() {
      return {
        id: '123098',
        name: "Mike",
        email: "mike@example.com"
      }
    },
    getPost() {
      return {
        id: "123456789",
        title: "Hi!",
        body: "Hello World",
        published: false
      }
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
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