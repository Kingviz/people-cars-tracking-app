import React, { useState } from 'react';
import { Card, Button } from 'antd';
import { Link } from 'react-router-dom';
import CarCard from './CarCard';
import PersonForm from './PersonForm';

const PersonCard = ({ person, onEdit, onDelete, onEditCar, onDeleteCar }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (values) => {
    onEdit(person.id, values);
    setIsEditing(false);
  };

  return (
    <Card
      title={`${person.firstName} ${person.lastName}`}
      style={{ marginBottom: '20px' }}
      extra={<Link to={`/people/${person.id}`}>LEARN MORE</Link>}
    >
      {isEditing ? (
        <PersonForm initialValues={person} onSubmit={handleEdit} />
      ) : (
        <>
          {person.cars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              onEdit={(id, values) => onEditCar(id, values)}
              onDelete={(id) => onDeleteCar(id)}
            />
          ))}
          <Button onClick={() => setIsEditing(true)}>Edit</Button>
          <Button onClick={() => onDelete(person.id)}>Delete</Button>
        </>
      )}
    </Card>
  );
};

export default PersonCard;