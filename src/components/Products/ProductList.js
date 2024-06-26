import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

const ProductList = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name" label="Product Name" />
      <TextField source="description" label="Product Description" />
      <TextField source="price" label="Product Price" />
      <TextField source="imageUrl" label="Image URL" />
    </Datagrid>
  </List>
);

export default ProductList;
