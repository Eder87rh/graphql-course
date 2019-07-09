const Query = {
  comments(parent, vars, { db }, info){
    return db.comments;
  },
  users(parent, { query }, { prisma }, info) {
    return prisma.query.users(null, info);

    /* if (query) {
      return db.users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
    } else {
      return db.users;
    } */
  },
  posts(parent, { query }, { prisma }, info) {
    return prisma.query.posts(null, info)
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