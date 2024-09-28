import axios from "axios";
import { Person } from "../types/Person";
const baseUrl = `http://localhost:3001/persons`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response.data)
  return response.data;
};

const create = async (newPerson: Person) => {
  const response = await axios.post(baseUrl, newPerson);
  return response.data;
};

const update = async (id:string, updatedPerson: Person) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedPerson);
  return response.data;
};

const remove = async (id:string) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export { getAll, create, update, remove };