import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

const ViewUserList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="username" />
      <TextField source="email" />
      <EditButton basePath="/admin/users" />
      <DeleteButton basePath="/admin/users" />
    </Datagrid>
  </List>
);

export default ViewUserList;
