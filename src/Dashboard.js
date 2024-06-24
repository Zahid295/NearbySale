import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server'; 

// Import your custom components for each resource
import ViewUserList from './components/Users/ViewUserList';
// import UserEdit from './components/UserComponents/UserEdit';
// import UserCreate from './components/UserComponents/UserCreate';
// import ProductList from './components/ProductComponents/ProductList';
// import ProductEdit from './components/ProductComponents/ProductEdit';
// import ProductCreate from './components/ProductComponents/ProductCreate';


const dataProvider = jsonServerProvider('http://localhost:3000/admin'); 

const AdminDashboard = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Routes>
      <Route path="/users" exact>
      <Resource name="users" list={ViewUserList} /*  edit={UserEdit} create={UserCreate} *//>
      </Route>

      {/* <Route path="/products" exact>
      <Resource name="products" list={ProductList} edit={ProductEdit} create={ProductCreate} />
      </Route> */}
      </Routes>
    </Admin>
  );
};

export default AdminDashboard;
