"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var comments = [{
  id: "1",
  text: "Comment 1",
  author: "1",
  post: "1"
}, {
  id: "2",
  text: "Comment 2",
  author: "2",
  post: "2"
}, {
  id: "3",
  text: "Comment 2",
  author: "3",
  post: "4"
}];

// Demo User Data
var users = [{
  id: '1',
  name: "Eder",
  email: "eder@example.com",
  age: 31
}, {
  id: '2',
  name: "Sarah",
  email: "sarah@example.com"
}, {
  id: '3',
  name: "Mike",
  email: "mike@example.com"
}];

// Demo Posts Data
var posts = [{
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
}, {
  id: "4",
  title: "Titulo 4",
  body: "Sin comentarios",
  published: false,
  author: "1"
}];

var db = {
  users: users,
  posts: posts,
  comments: comments
};

exports.default = db;