import ApolloBoost, { gql } from 'apollo-boost';

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
});

const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`;

const getPosts = gql`
  query {
    posts {
      id
      title
      body
      author {
        name
      }
    }
  }
`;

client.query({
  query: getUsers
}).then((response) => {
  let html = ''

  response.data.users.map(user => html += `
    <div>
      <h3>${user.name}</h3>
    </div>
  ` );

  document.querySelector('#users').innerHTML = html
});

client.query({
  query: getPosts
}).then(response => {
  let html = ''

  response.data.posts.map(post => html += `
    <div>
      <h3>${post.title}</h3>
      <h4>${post.author.name}</h4>
    </div>
  ` );

  document.getElementById('posts').innerHTML = html;
})