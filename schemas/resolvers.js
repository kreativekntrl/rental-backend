const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User, Rental } = require("../models");
const { signToken } = require("../util/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("favorites");
      }
      throw new AuthenticationError("You must be logged in!");
    },
    rentals: async () => {
      return Rental.find({});
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        const user = await User.create({
          ...args,
        });
        const token = await signToken(user);
        return {
          user,
          token,
        };
      } catch (err) {
        if (err.name === "MongoError" && error.code === 11000) {
          const [[key, value]] = Object.entries(err.keyValue);
          throw new UserInputError(`${key} "${value}" already exists.`);
        }
        throw err;
      }
    },
    login: async (parent, args) => {
      const { email, password } = args;
      const user = await User.findOne({
        email,
      });
      if (!user) {
        throw new AuthenticationError("Invalid email or password");
      }
      const authentic = await user.isCorrectPassword(password);
      if (!authentic) {
        throw new AuthenticationError("Invalid email or password");
      }
      const token = await signToken(user);
      await user.save();
      return {
        token,
        user,
      };
    },
    addFavorite: async (
      parent,
      { _id },
      context
    ) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          { _id: context.user._id },
          {
            $push: {
              favorites: _id,
            },
          },
          {
            new: true,
          }
        ).populate("favorites");
        return user;
      }
      throw new AuthenticationError("you need to be logged in!");
    },
    removeFavorite: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $pull: {
              favorites: _id,
            },
          },
          { new: true }
        );
        return user;
      }
      throw new AuthenticationError("you need to be logged in!");
    },
  },
};

module.exports = resolvers;
