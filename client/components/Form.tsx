import React, { useState } from "react";
import { Input, Button, Form as AntForm } from "antd";
import { api } from "../utils/axios";

const graphqlSchema = `
  type Query {
    getUser(id: ID!): User
    allUsers: [User]
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  input UserInput {
    name: String!
    email: String!
  }

  schema {
    query: Query
    mutation: Mutation
  }
`;

const { TextArea } = Input;

const Form = () => {
  const [schema, setSchema] = useState(graphqlSchema);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await api.post("/post-schema", {
        schema,
      });
      window.location.href = `/schema.png`;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AntForm
      name="basic"
      labelCol={{ span: 1 }}
      wrapperCol={{ span: 16 }}
      style={{ width: "100%" }}
      autoComplete="off"
      onFinish={handleSubmit}
      initialValues={{ schema }}
    >
      <AntForm.Item
        label="Schema"
        name="schema"
        rules={[{ required: true, message: "Please input your schema!" }]}
      >
        <TextArea
          rows={24}
          value={schema}
          onChange={(e) => setSchema(e.target.value)}
        />
      </AntForm.Item>
      <AntForm.Item wrapperCol={{ offset: 1, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </AntForm.Item>
    </AntForm>
  );
};

export { Form };
