'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getUserId = require('../utils/getUserId');

var _getUserId2 = _interopRequireDefault(_getUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve: function resolve(parent, args, _ref, info) {
      var request = _ref.request;

      var userId = (0, _getUserId2.default)(request, false);

      if (userId && userId === parent.id) {
        return parent.email;
      } else {
        return null;
      }
    }
  },
  posts: {
    fragment: 'fragment userId on User { id }',
    resolve: function resolve(parent, args, _ref2, info) {
      var prisma = _ref2.prisma,
          request = _ref2.request;

      var userId = (0, _getUserId2.default)(request, false);

      return prisma.query.posts({
        where: {
          author: {
            id: parent.id
          },
          published: true
        }
      });
    }
  }
};

exports.default = User;