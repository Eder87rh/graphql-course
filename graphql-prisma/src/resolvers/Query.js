import getUserId from "../utils/getUserId";

const Query = {
  comments(parent, { query, first, skip, after, orderBy }, { prisma }, info){
    const opArgs = {
      first,
      skip,
      after,
      orderBy
    }

    return prisma.query.comments(opArgs, info);
  },
  users(parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = {
      first,
      skip,
      after,
      orderBy
    };

    if (query) {
      opArgs.where = {
        OR: [{
          name_contains: query
        }]
      }
    }

    return prisma.query.users(opArgs, info);
  },
  myPosts(parent, { query }, { prisma, request, first, skip, after, orderBy }, info){
    const userId = getUserId(request);


    const opArgs = {
      where: {
        author: {
          id: userId
        }
      },
      first,
      skip,
      after,
      orderBy
    }

    if (query) {
      opArgs.where.OR =[{
        title_contains: query
      }, {
        body_contains: query
      }];
    }

    return prisma.query.posts(opArgs, info);
  },
  posts(parent, { query, first, skip, after, orderBy }, { prisma }, info) {
    const opArgs = {
      where: {
        published: true
      },
      first,
      skip,
      after,
      orderBy
    }

    if (query) {
      opArgs.where.OR = [{
        title_contains: query
      }, {
        body_contains: query
      }];
    }
    
    return prisma.query.posts(opArgs, info);
  },
  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);
    const user = await prisma.query.user({
      where: {
        id: userId
      }
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
  async getPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request, false);
    const posts = await prisma.query.posts({
      where: {
        id: args.id,
        OR: [{
          published: true
        }, {
          author: {
            id: userId
          }
        }]
      },
    }, info);
    
    if (posts.length === 0) {
      throw new Error("Post not found");
    }

    return posts[0];

  
  }
};

export default Query;