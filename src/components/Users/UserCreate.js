import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const UserCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="username" label="Username" />
      <TextInput source="password" label="Password" type="password" />
    </SimpleForm>
  </Create>
);

export default UserCreate;
