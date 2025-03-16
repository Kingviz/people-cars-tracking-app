let people = [
  { id: '1', firstName: 'Bill', lastName: 'Gates' },
  { id: '2', firstName: 'Steve', lastName: 'Jobs' },
  { id: '3', firstName: 'Linux', lastName: 'Torvalds' },
];

let cars = [
  { id: '1', year: 2019, make: 'Toyota', model: 'Corolla', price: 40000, personId: '1' },
  { id: '2', year: 2018, make: 'Lexus', model: 'LX 600', price: 13000, personId: '1' },
  { id: '3', year: 2017, make: 'Honda', model: 'Civic', price: 20000, personId: '1' },
  { id: '4', year: 2019, make: 'Acura', model: 'MDX', price: 60000, personId: '2' },
  { id: '5', year: 2018, make: 'Ford', model: 'Focus', price: 35000, personId: '2' },
  { id: '6', year: 2017, make: 'Honda', model: 'Pilot', price: 45000, personId: '2' },
  { id: '7', year: 2019, make: 'Volkswagen', model: 'Golf', price: 40000, personId: '3' },
  { id: '8', year: 2018, make: 'Kia', model: 'Sorento', price: 45000, personId: '3' },
  { id: '9', year: 2017, make: 'Volvo', model: 'XC40', price: 55000, personId: '3' },
];

const resolvers = {
  Query: {
    people: () => people,
    cars: () => cars,
    person: (_, { id }) => people.find((person) => person.id === id),
    car: (_, { id }) => cars.find((car) => car.id === id),
    personWithCars: (_, { id }) => {
      const person = people.find((person) => person.id === id);
      if (!person) throw new Error('Person not found');
      return {
        ...person,
        cars: cars.filter((car) => car.personId === id),
      };
    },
  },
  Mutation: {
    addPerson: (_, { firstName, lastName }) => {
      const person = { id: String(people.length + 1), firstName, lastName };
      people.push(person);
      return person;
    },
    updatePerson: (_, { id, firstName, lastName }) => {
      const person = people.find((person) => person.id === id);
      if (!person) throw new Error('Person not found');
      if (firstName) person.firstName = firstName;
      if (lastName) person.lastName = lastName;
      return person;
    },
    deletePerson: (_, { id }) => {
      const index = people.findIndex((person) => person.id === id);
      if (index === -1) throw new Error('Person not found');
      people.splice(index, 1);
      cars = cars.filter((car) => car.personId !== id); // Remove associated cars
      return id;
    },
    addCar: (_, { year, make, model, price, personId }) => {
      const person = people.find((person) => person.id === personId);
      if (!person) throw new Error('Person not found');

      const car = {
        id: String(cars.length + 1),
        year: parseInt(year, 10),
        make,
        model,
        price: parseFloat(price),
        personId,
      };
      cars.push(car);
      return car;
    },
    updateCar: (_, { id, year, make, model, price, personId }) => {
      const car = cars.find((car) => car.id === id);
      if (!car) throw new Error('Car not found');

      if (year) car.year = parseInt(year, 10);
      if (make) car.make = make;
      if (model) car.model = model;
      if (price) car.price = parseFloat(price);

      if (personId) {
        const person = people.find((person) => person.id === personId);
        if (!person) throw new Error('Person not found');
        car.personId = personId;
      }
      return car;
    },
    deleteCar: (_, { id }) => {
      const index = cars.findIndex((car) => car.id === id);
      if (index === -1) throw new Error('Car not found');
      cars.splice(index, 1);
      return id;
    },
  },
  Person: {
    cars: (person) => cars.filter((car) => car.personId === person.id),
  },
  Car: {
    person: (car) => {
      const person = people.find((person) => person.id === car.personId);
      if (!person) throw new Error('Person not found');
      return person;
    },
  },
};

export default resolvers; // ✅ Use ESM export
