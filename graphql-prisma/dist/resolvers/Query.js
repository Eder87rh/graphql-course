"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getUserId = require("../utils/getUserId");

var _getUserId2 = _interopRequireDefault(_getUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = {
  comments: function comments(parent, _ref, _ref2, info) {
    var query = _ref.query,
        first = _ref.first,
        skip = _ref.skip,
        after = _ref.after,
        orderBy = _ref.orderBy;
    var prisma = _ref2.prisma;

    var opArgs = {
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    return prisma.query.comments(opArgs, info);
  },
  users: function users(parent, _ref3, _ref4, info) {
    var query = _ref3.query,
        first = _ref3.first,
        skip = _ref3.skip,
        after = _ref3.after,
        orderBy = _ref3.orderBy;
    var prisma = _ref4.prisma;

    var opArgs = {
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    if (query) {
      opArgs.where = {
        OR: [{
          name_contains: query
        }]
      };
    }

    return prisma.query.users(opArgs, info);
  },
  myPosts: function myPosts(parent, _ref5, _ref6, info) {
    var query = _ref5.query;
    var prisma = _ref6.prisma,
        request = _ref6.request,
        first = _ref6.first,
        skip = _ref6.skip,
        after = _ref6.after,
        orderBy = _ref6.orderBy;

    var userId = (0, _getUserId2.default)(request);

    var opArgs = {
      where: {
        author: {
          id: userId
        }
      },
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    if (query) {
      opArgs.where.OR = [{
        title_contains: query
      }, {
        body_contains: query
      }];
    }

    return prisma.query.posts(opArgs, info);
  },
  posts: function posts(parent, _ref7, _ref8, info) {
    var query = _ref7.query,
        first = _ref7.first,
        skip = _ref7.skip,
        after = _ref7.after,
        orderBy = _ref7.orderBy;
    var prisma = _ref8.prisma;

    var opArgs = {
      where: {
        published: true
      },
      first: first,
      skip: skip,
      after: after,
      orderBy: orderBy
    };

    if (query) {
      opArgs.where.OR = [{
        title_contains: query
      }, {
        body_contains: query
      }];
    }

    return prisma.query.posts(opArgs, info);
  },
  me: function () {
    var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref9, info) {
      var prisma = _ref9.prisma,
          request = _ref9.request;
      var userId, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userId = (0, _getUserId2.default)(request, false);
              _context.next = 3;
              return prisma.query.user({
                where: {
                  id: userId
                }
              });

            case 3:
              user = _context.sent;

              if (user) {
                _context.next = 6;
                break;
              }

              throw new Error("User not found");

            case 6:
              return _context.abrupt("return", user);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function me(_x, _x2, _x3, _x4) {
      return _ref10.apply(this, arguments);
    }

    return me;
  }(),
  getPost: function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref11, info) {
      var prisma = _ref11.prisma,
          request = _ref11.request;
      var userId, posts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              userId = (0, _getUserId2.default)(request, false);
              _context2.next = 3;
              return prisma.query.posts({
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

            case 3:
              posts = _context2.sent;

              if (!(posts.length === 0)) {
                _context2.next = 6;
                break;
              }

              throw new Error("Post not found");

            case 6:
              return _context2.abrupt("return", posts[0]);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getPost(_x5, _x6, _x7, _x8) {
      return _ref12.apply(this, arguments);
    }

    return getPost;
  }()
};

exports.default = Query;