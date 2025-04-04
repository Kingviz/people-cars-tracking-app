import { gql } from '@apollo/client';

export const GET_PEOPLE_WITH_CARS = gql`
  query GetPeopleWithCars {
    people {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`;

export const PERSON_WITH_CARS = gql`
  query PersonWithCars($id: ID!) {
    personWithCars(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`;

export const ADD_PERSON = gql`
  mutation AddPerson($firstName: String!, $lastName: String!) {
    addPerson(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const ADD_CAR = gql`
  mutation AddCar($year: Int!, $make: String!, $model: String!, $price: Float!, $personId: ID!) {
    addCar(year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: ID!, $firstName: String, $lastName: String) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const DELETE_PERSON = gql`
  mutation DeletePerson($id: ID!) {
    deletePerson(id: $id)
  }
`;
export const UPDATE_CAR = gql`
  mutation UpdateCar($id: ID!, $year: Int, $make: String, $model: String, $price: Float, $personId: ID) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price, personId: $personId) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const DELETE_CAR = gql`
  mutation DeleteCar($id: ID!) {
    deleteCar(id: $id)
  }
`;