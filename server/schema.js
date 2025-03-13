import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Person {
    id: ID!
    firstName: String!
    lastName: String!
    cars: [Car!]!
  }

  type Car {
    id: ID!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personId: ID!
    person: Person!
  }

  type Query {
    people: [Person!]!
    cars: [Car!]!
    person(id: ID!): Person
    car(id: ID!): Car
    personWithCars(id: ID!): Person
  }

  type Mutation {
    addPerson(firstName: String!, lastName: String!): Person!
    updatePerson(id: ID!, firstName: String, lastName: String): Person!
    deletePerson(id: ID!): ID!
    addCar(year: Int!, make: String!, model: String!, price: Float!, personId: ID!): Car!
    updateCar(id: ID!, year: Int, make: String, model: String, price: Float, personId: ID): Car!
    deleteCar(id: ID!): ID!
  }
`;

export default typeDefs;
