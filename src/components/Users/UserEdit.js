import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';
// import { Edit, SimpleForm, TextInput, EmailInput } from 'react-admin';

const UserEdit = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="username" />
      {/* <EmailInput source="email" /> */}
    </SimpleForm>
  </Edit>
);

export default UserEdit;
