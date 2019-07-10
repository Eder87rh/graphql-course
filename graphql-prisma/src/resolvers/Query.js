const Query = {
  comments(parent, args, { db }, info){
    return db.comments;
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
};

export default Query;