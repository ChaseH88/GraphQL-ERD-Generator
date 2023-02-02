import React, { useState } from "react";
import { Input } from "antd";

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

  return (
    <div>
      <TextArea
        rows={20}
        value={schema}
        onChange={(e) => setSchema(e.target.value)}
      />
    </div>
  );
};

export { Form };
