import React from 'react';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server'; 

// Import your custom components for each resource
import ViewUserList from './components/Users/ViewUserList';
import UserEdit from './components/Users/UserEdit';
import UserCreate from './components/Users/UserCreate';
// import ProductList from './components/ProductComponents/ProductList';
// import ProductEdit from './components/ProductComponents/ProductEdit';
// import ProductCreate from './components/ProductComponents/ProductCreate';


const dataProvider = jsonServerProvider('http://localhost:3000'); 

const AdminDashboard = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={ViewUserList} edit={UserEdit} create={UserCreate} />

      {/* <Route path="/products" exact>
      <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} />
      </Route> */}
    </Admin>
  );
};

export default AdminDashboard;
