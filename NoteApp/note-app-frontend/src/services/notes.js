import axios from 'axios';

const baseUrl = 'http://localhost:3001/';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
    handleRequestError(error);
  }
};

const deleteNote = async (id) => {
  try {
    await axios.delete(`${baseUrl}${id}`);
  } catch (error) {
    handleRequestError(error);
  }
};

const handleRequestError = (error) => {
  console.error('Request failed:', error.message || error);
  throw error; // Re-throw the error for the calling function to handle
};

export default { getAll, create, deleteNote };
