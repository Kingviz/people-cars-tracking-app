import React from 'react';
import { useQuery } from '@apollo/client';
import { PERSON_WITH_CARS } from '../src/queries';
import { Link, useParams } from 'react-router-dom';
import CarCard from '../src/components/CarCard';
import { Button } from 'antd';

const ShowPage = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(PERSON_WITH_CARS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { firstName, lastName, cars } = data.personWithCars;

  return (
    <div>
      <h1>{firstName} {lastName}</h1>
      <Link to="/">
        <Button type="primary">GO BACK HOME</Button>
      </Link>
      <div>
        {cars.map(car => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default ShowPage;