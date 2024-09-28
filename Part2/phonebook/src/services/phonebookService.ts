import axios from "axios";
import { Person } from "../types/Person";
const baseUrl = `http://localhost:3001/persons`;

const getAll = async (): Promise<Person[]> =>  {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newPerson: Person) => {
  const response = await axios.post(baseUrl, newPerson);
  return response.data;
};

const update = async (id: string, updatedPerson: Person) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedPerson);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("The person's phone you are trying to update has already been deleted.");
    }
    throw error;
  }
};

const remove = async (id:string) => {
  try{
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("The person's phone you are trying to delete has already been deleted.");
    }
    throw error;
  }
};

export { getAll, create, update, remove };