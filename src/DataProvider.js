import axios from 'axios';

const apiUrl = 'http://localhost:3000'; 

const myDataProvider = {
  getList: async (resource, params) => {
    const response = await axios.get(`${apiUrl}/${resource}`);
    return response.data;
  },
  getOne: async (resource, params) => {
    const response = await axios.get(`${apiUrl}/${resource}/${params.id}`);
    return response.data;
  },
  create: async (resource, params) => {
    const response = await axios.post(`${apiUrl}/${resource}`, params.data);
    return response.data;
  },
  update: async (resource, params) => {
    const response = await axios.put(`${apiUrl}/${resource}/${params.id}`, params.data);
    return response.data;
  },
  delete: async (resource, params) => {
    await axios.delete(`${apiUrl}/${resource}/${params.id}`);
    return { data: params.previousData };
  },
};

export default myDataProvider;