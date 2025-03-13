import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useQuery } from '@apollo/client';
import { GET_PEOPLE_WITH_CARS } from '../queries';

const CarForm = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();
  const { data } = useQuery(GET_PEOPLE_WITH_CARS);
  const [peopleOptions, setPeopleOptions] = useState([]);

  useEffect(() => {
    if (data && data.people) {
      const options = data.people.map(person => ({
        label: `${person.firstName} ${person.lastName}`,
        value: person.id,
      }));
      setPeopleOptions(options);
    }
  }, [data]);

  const onFinish = (values) => {
    
    const formattedValues = {
      ...values,
      year: parseInt(values.year, 10), 
      price: parseFloat(values.price), 
    };
    onSubmit(formattedValues);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        label="Year"
        name="year"
        rules={[{ required: true, message: 'Please enter the year' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Make"
        name="make"
        rules={[{ required: true, message: 'Please enter the make' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Model"
        name="model"
        rules={[{ required: true, message: 'Please enter the model' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please enter the price' }]}
      >
        <Input type="number" step="0.01" />
      </Form.Item>
      <Form.Item
        label="Owner"
        name="personId"
        rules={[{ required: true, message: 'Please select an owner' }]}
      >
        <Select options={peopleOptions} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Update Car' : 'Add Car'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CarForm;