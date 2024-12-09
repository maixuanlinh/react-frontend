import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const getAllItems = async () => {
  const response = await axios.get(`${BASE_URL}/getall`);
  return response.data;
};

export const searchItemById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const addItem = async (data) => {
  const response = await axios.post(`${BASE_URL}/add`, data);
  return response.data;
};

export const updateItem = async (id, data) => {
  const response = await axios.put(`${BASE_URL}/update/${id}`, data);
  return response.data;
};

export const deleteItem = async (id) => {
  const response = await axios.delete(`${BASE_URL}/delete/${id}`);
  return response.data;
};
