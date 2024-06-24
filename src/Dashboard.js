import React from 'react';
import { Admin } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server'; // You can replace this with your actual data provider
import { Route } from 'react-router-dom';

// Import your custom components for each resource
import { UserList, UserEdit, UserCreate } from './UserComponents';
import { ProductList, ProductEdit, ProductCreate } from './ProductComponents';

const dataProvider = jsonServerProvider('http://localhost:3001'); // Replace with your backend API URL

const AdminDashboard = () => {
  return (
    <Admin dataProvider={dataProvider}>
      {/* Define your custom routes */}
      <Route exact path="/components/ViewUserList" component={UserList} />
      <Route exact path="/admin/users/create" component={UserCreate} />
      <Route exact path="/admin/users/:id" component={UserEdit} />

      <Route exact path="/admin/products" component={ProductList} />
      <Route exact path="/admin/products/create" component={ProductCreate} />
      <Route exact path="/admin/products/:id" component={ProductEdit} />
    </Admin>
  );
};

export default AdminDashboard;
