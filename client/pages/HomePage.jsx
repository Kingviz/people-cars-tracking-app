import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PEOPLE_WITH_CARS, ADD_PERSON, ADD_CAR, UPDATE_PERSON, DELETE_PERSON, UPDATE_CAR, DELETE_CAR } from '../src/queries';
import PersonCard from '../src/components/PersonCard';
import PersonForm from '../src/components/PersonForm';
import CarForm from '../src/components/Carform'; 
import { Collapse } from 'antd';
import '../src/App.css'

const { Panel } = Collapse;

const HomePage = () => {
  
  const { data, loading, error: queryError } = useQuery(GET_PEOPLE_WITH_CARS);

 
  const [addPerson, { error: addPersonError }] = useMutation(ADD_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE_WITH_CARS }],
  });
  const [addCar, { error: addCarError }] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_PEOPLE_WITH_CARS }],
  });
  const [updatePerson, { error: updatePersonError }] = useMutation(UPDATE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE_WITH_CARS }],
  });
  const [deletePerson, { error: deletePersonError }] = useMutation(DELETE_PERSON, {
    refetchQueries: [{ query: GET_PEOPLE_WITH_CARS }],
  });
  const [updateCar, { error: updateCarError }] = useMutation(UPDATE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE_WITH_CARS }],
  });
  const [deleteCar, { error: deleteCarError }] = useMutation(DELETE_CAR, {
    refetchQueries: [{ query: GET_PEOPLE_WITH_CARS }],
  });

  
  if (loading) return <p>Loading...</p>;
  if (queryError) return <p>Error fetching data: {queryError.message}</p>;

  return (
    <div className='heading-1'>
      <h1>People and Their Cars</h1>

      
      {addPersonError && <p>Error adding person: {addPersonError.message}</p>}
      {addCarError && <p>Error adding car: {addCarError.message}</p>}
      {updatePersonError && <p>Error updating person: {updatePersonError.message}</p>}
      {deletePersonError && <p>Error deleting person: {deletePersonError.message}</p>}
      {updateCarError && <p>Error updating car: {updateCarError.message}</p>}
      {deleteCarError && <p>Error deleting car: {deleteCarError.message}</p>}

     
      <Collapse>
        <Panel header="Add Person" key="1">
          <PersonForm
            onSubmit={(values) => {
              addPerson({ variables: values });
            }}
          />
        </Panel>
        {data.people.length > 0 && ( 
          <Panel header="Add Car" key="2">
            <CarForm
              people={data.people}
              onSubmit={(values) => {
                addCar({ variables: values });
              }}
            />
          </Panel>
        )}
      </Collapse>

      
      {data.people.map(person => (
        <PersonCard
          key={person.id}
          person={person}
          onEdit={(id, values) => updatePerson({ variables: { id, ...values } })}
          onDelete={(id) => deletePerson({ variables: { id } })}
          onEditCar={(id, values) => updateCar({ variables: { id, ...values } })}
          onDeleteCar={(id) => deleteCar({ variables: { id } })}
        />
      ))}
    </div>
  );
};

export default HomePage;