import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const ProductCreate = (props) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="Product Name" />
      <TextInput source="description" label="Product Description" />
      <TextInput source="price" label="Product Price" />
      <TextInput source="imageUrl" label="Image URL" />
    </SimpleForm>
  </Create>
);

export default ProductCreate;
