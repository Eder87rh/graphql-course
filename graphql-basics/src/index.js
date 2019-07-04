import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

// Scalar types - String, Boolean, Int, Float, ID

// Demo Comments data
const comments = [{
  id: "1",
  text: "Comment 1",
  author: "1",
  post: "1"
}, {
  id: "2",
  text: "Comment 2",
  author: "2",
  post: "2"
}];

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
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    getPost: Post!
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    createPost(data: CreatePostInput!): Post!
    createComment(data: CreateCommentInput!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    comments(parent, vars, ctx, info){
      return comments;
    },
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
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some(user => user.email === args.data.email);
      
      if (emailTaken) {
        throw new Error("Email taken.");
      }

      const user = {
        id: uuidv4(),
        ...args.data
      };

      users.push(user);

      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.data.author);

      if (!userExists){
        throw new Error("User does not exists!");
      }

      const post = {
        id: uuidv4(),
        ...args.data
      };

      posts.push(post);

      return post;
    },
    createComment(parent, args, ctx, info){
      const userExists = users.some(user => user.id === args.data.author);
      const postExists = posts.some(el => el.id === args.data.post && el.published);

      if (!userExists || !postExists) {
        throw new Error("Unable to find user or post!");
      }


      const newPost = {
        id: uuidv4(),
        ...args.data
      };

      comments.push(newPost);

      return newPost;
    }
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => comment.post === parent.id);
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      })
    }

  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return posts.find(post => post.id === parent.post);
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