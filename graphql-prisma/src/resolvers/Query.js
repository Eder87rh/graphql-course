import getUserId from "../utils/getUserId";

const Query = {
  comments(parent, { query }, { prisma }, info){
    return prisma.query.comments(null, info);
  },
  users(parent, { query }, { prisma }, info) {
    const opArgs = {};

    if (query) {
      opArgs.where = {
        OR: [{
          name_contains: query
        }, {
          email_contains: query
        }]
      }
    }

    return prisma.query.users(opArgs, info);

    /* if (query) {
      return db.users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
    } else {
      return db.users;
    } */
  },
  posts(parent, { query }, { prisma }, info) {
    const opArgs = {}

    if (query) {
      opArgs.where = {
        OR: [{
          title_contains: query
        }, {
          body_contains: query
        }]
      }
    }
    
    return prisma.query.posts(opArgs, info);

    /* if (query) {
      return db.posts.filter(({ title, body }) => { 
        return  title.toLowerCase().includes(query.toLowerCase()) || 
                body.toLowerCase().includes(query.toLowerCase())
      });
    } else {
      return db.posts;
    } */
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
      }
    }, info);
    
    if (posts.length === 0) {
      throw new Error("Post not found");
    }

    return posts[0];

  
  }
};

export default Query;