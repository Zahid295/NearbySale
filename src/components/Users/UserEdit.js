import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="username" label="Username" />
      <TextInput source="password" label="Password" type="password" />
    </SimpleForm>
  </Edit>
);

export default UserEdit;
