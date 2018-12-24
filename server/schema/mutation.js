const graphql = require('graphql');

const UserType = require('./types/user_type');
const { signup, login } = require('../services/auth');

const { GraphQLObjectType, GraphQLString } = graphql;

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: async (parentValue, { email, password }, req) => {
        try {
          const user = await login({ email, password, req });
          return user;
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    },
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve: async (parentValue, { email, password }, req) => {
        try {
          const user = await signup({ email, password, req });
          return user;
        } catch (err) {
          console.error(err);
          throw err;
        }
      }
    }
  }
});

module.exports = mutation;
