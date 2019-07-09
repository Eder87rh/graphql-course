import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
});

// prisma.query
// prisma.mutation
// prisma.subscription
// prisma.exists

const createPostForUser = async (authorId, data) => {
  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, '{ id }');

  const user = await prisma.query.user({
    where: {
      id: authorId
    }
  }, '{ id name email posts { id title published } }');

  return user;
};

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost({
    where: {
      id: postId
    },
    data
  }, '{ author {id} }' )

  const authorId = post.author.id;
  const user = await prisma.query.user({
    where: {
      id: authorId
    }
  }, '{ id name email posts { id title published } }');

  return user;
}

/* updatePostForUser("cjxvwszwo01e50802i185zd0c", {
  published: false
}).then(user => {
console.log("TCL: user", JSON.stringify( user, undefined, 2))
  
}). catch(err => console.log(err)); */