import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const PersonForm = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
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
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please enter the first name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please enter the last name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Update Person' : 'Add Person'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PersonForm;