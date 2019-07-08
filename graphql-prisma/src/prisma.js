import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

// prisma.query
// prisma.mutation
// prisma.subscription
// prisma.exists

/* prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
  console.log("TCL: data", JSON.stringify(data, undefined, 2));
}) */

/* prisma.query.comments(null, '{ id text author { id name } }').then(data => {
  console.log("TCL: data", JSON.stringify(data, undefined, 2))
}). catch(err => {
  console.log("TCL: err", err)
}); */

/* prisma.mutation.createPost({
  data: {
    title: "GraphQL 101",
    body: "",
    published: false,
    author: {
      connect: {
        id: "cjxusgotc00910802oehc4so2"
      }
    }
  }
}, '{ id title body published }').then(data => {
  console.log(JSON.stringify(data, undefined, 2));
  return prisma.query.users(null, '{ id name posts { id title } }')
}).then((data) => {
  console.log(JSON.stringify(data, undefined, 2));
}); */

prisma.mutation.updatePost({
  data: {
    published: true
  },
  where: {
    id: "cjxuwjq4j01bl080257mcv04b"
  }
}, '{ id title body published }').then(data => {
  console.log(JSON.stringify(data, undefined, 2));

  return prisma.query.posts(null, '{ id title body published }')
}).then(data => {
  console.log(JSON.stringify(data, undefined, 2));
}).catch(err => {
  console.log(err);
});