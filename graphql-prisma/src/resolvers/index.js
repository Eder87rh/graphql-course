import { extractFragmentReplacements } from 'prisma-binding'
import Query from './Query';
import Mutation from './Mutation';
import Subscription from './Subscription';
import User from './User';
import Post from './Post.js';
import Comment from './Comment.js';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment
};

export const fragmentReplacements = extractFragmentReplacements(resolvers)

export default resolvers;