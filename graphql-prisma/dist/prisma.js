'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _prismaBinding = require('prisma-binding');

var _resolvers = require('./resolvers');

var prisma = new _prismaBinding.Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: "thisismysupersecrettext",
  fragmentReplacements: _resolvers.fragmentReplacements
});

exports.default = prisma;

// prisma.query
// prisma.mutation
// prisma.subscription
// prisma.exists

/* prisma.exists.Comment({
  id: "cjxusl4mx00bz0802baa3rz74",
  author: {
    id: "cjxusgotc00910802oehc4so2"
  }
}).then((exists) => {
  console.log(exists)
}); */

/* const createPostForUser = async (authorId, data) => {

  const userExists = await prisma.exists.User({ id: authorId });

  if (!userExists) {
    throw new Error("User not found!");
  }

  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, '{ author { id name email posts { id title published } } }');

  return post.author;
};

const updatePostForUser = async (postId, data) => {

  const postExists = await prisma.exists.Post({
    id: postId
  });

  if (!postExists) {
    throw new Error("Post not found!");
  }

  const post = await prisma.mutation.updatePost({
    where: {
      id: postId
    },
    data
  }, '{ author { id name email posts { id title published } } }' )

  return post.author;
} */

/* createPostForUser("cjxusgotc00910802oehc4so2", {
  title: "Great books to read",
  body: "The war of art",
  published: true
}).then(user => {
  console.log(JSON.stringify(user ,undefined, 2))
}).catch(err => console.log(err)); */

/* updatePostForUser("cjxvwszwo01e50802i185zd0cXXX", {
  published: false
}).then(user => {
console.log("TCL: user", JSON.stringify( user, undefined, 2))
  
}). catch(err => console.log(err)); */