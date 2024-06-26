import axios from 'axios';
// Express server url
const apiUrl = 'http://localhost:3000'; 

const dataProvider = {
  create: (resource, params) => {
    if (resource === 'products') {
      // Assuming params.data contains the product data
      const { name, description, price, imageUrl } = params.data;

      return axios.post(`${apiUrl}/products`, {
        name, // Adjust field names as needed
        description,
        price,
        imageUrl,
      });
    }
    // Handle other resources if needed
    return Promise.reject('Unknown resource');
  },
  // Other CRUD methods (list, update, delete) can be implemented similarly
};

export default dataProvider; // Export the variable 'dataProvider'
