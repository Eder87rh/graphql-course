import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

import db from './db';

// Resolvers
const resolvers = {
  Query: {
    comments(parent, vars, { db }, info){
      return db.comments;
    },
    users(parent, { query }, { db }, info) {
      if (query) {
        return db.users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
      } else {
        return db.users;
      }
    },
    posts(parent, { query }, { db }, info) {
      if (query) {
        return db.posts.filter(({ title, body }) => { 
          return  title.toLowerCase().includes(query.toLowerCase()) || 
                  body.toLowerCase().includes(query.toLowerCase())
        });
      } else {
        return db.posts;
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
    createUser(parent, args, { db }, info) {
      const emailTaken = db.users.some(user => user.email === args.data.email);
      
      if (emailTaken) {
        throw new Error("Email taken.");
      }

      const user = {
        id: uuidv4(),
        ...args.data
      };

      db.users.push(user);

      return user;
    },
    deleteUser(parent, args, { db }, info) {
      const userIndex = db.users.findIndex(user => user.id === args.id);
      if (userIndex === -1) {
        throw new Error('User not found');
      }

      const deletedUsers = db.users.splice(userIndex, 1);

      db.posts = db.posts.filter((post) => {
        const match = post.author === args.id;

        if (match) {
          db.comments = db.comments.filter(comment => comment.post !== post.id);
        }

        return !match
      });

      db.comments = db.comments.filter(comment => comment.author !== args.id);

      return deletedUsers[0];
    },
    createPost(parent, args, { db }, info) {
      const userExists = db.users.some(user => user.id === args.data.author);

      if (!userExists){
        throw new Error("User does not exists!");
      }

      const post = {
        id: uuidv4(),
        ...args.data
      };

      db.posts.push(post);

      return post;
    },
    deletePost(parent, args, { db }, info) {
      const postIndex = db.posts.findIndex(post => post.id === args.id);
      console.log("TCL: deletePost -> postIndex", postIndex)
      

      if (postIndex === -1) {
        throw new Error("Post dos not exists!");
      }

      const deletedPost = db.posts.splice(postIndex, 1);

      db.comments = db.comments.filter(comment => comment.post !== args.id);

      return deletedPost[0];

    },
    createComment(parent, args, { db }, info) {
      const userExists = db.users.some(user => user.id === args.data.author);
      const postExists = db.posts.some(el => el.id === args.data.post && el.published);

      if (!userExists || !postExists) {
        throw new Error("Unable to find user or post!");
      }


      const newPost = {
        id: uuidv4(),
        ...args.data
      };

      db.comments.push(newPost);

      return newPost;
    },
    deleteComment(parent, args, { db }, info) {
      const commentIndex = db.comments.findIndex(comment => comment.id === args.id);

      if (commentIndex === -1) {
        throw new Error("Comment does not exists!");
      }

      const deletedComment = db.comments.splice(commentIndex, 1);

      return deletedComment[0];

    }
  },
  Post: {
    author(parent, args, { db }, info) {
      return db.users.find(user => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(comment => comment.post === parent.id);
    }
  },
  User: {
    posts(parent, args, { db }, info) {
      return db.posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, { db }, info) {
      return db.comments.filter(comment => {
        return comment.author === parent.id;
      })
    }

  },
  Comment: {
    author(parent, args, { db }, info) {
      return db.users.find(user => {
        return user.id === parent.author;
      });
    },
    post(parent, args, { db }, info) {
      return db.posts.find(post => post.id === parent.post);
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    db,
  }
});

server.start(() => {
  console.log('The server is up!');
});