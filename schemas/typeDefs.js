const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Query {
    me: User
    rentals: [Rental]
}

type Rental {
    _id: ID!
    cityName: String!
    descr: String!
    price: Int!
    rentalImg: String
}

type Auth {
    token: String!
    user: User!
}

type User {
    _id: ID!
    email: String!
    favorites: [Rental]
}

type Mutation {
    createUser(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFavorite(_id: ID!): User
    removeFavorite(_id: ID!): User
}
`;

module.exports = typeDefs;
