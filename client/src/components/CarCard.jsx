import React, { useState } from 'react';
import { Card, Button } from 'antd';
import CarForm from './Carform';

const CarCard = ({ car, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (values) => {
    onEdit(car.id, values);
    setIsEditing(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };


  return (
    <Card
      type="inner"
      style={{ marginBottom: '10px' }}
      actions={[
        <Button onClick={() => setIsEditing(!isEditing)}>Edit</Button>,
        <Button onClick={() => onDelete(car.id)}>Delete</Button>,
      ]}
    >
      {isEditing ? (
        <CarForm initialValues={car} onSubmit={handleEdit} />
      ) : (
        <>
          <p><strong>Year:</strong> {car.year}</p>
          <p><strong>Make:</strong> {car.make}</p>
          <p><strong>Model:</strong> {car.model}</p>
          <p><strong>Price:</strong> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(car.price)}</p>
        </>
      )}
    </Card>
  );
};

export default CarCard;