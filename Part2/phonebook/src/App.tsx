/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import { Person } from './types/Person'
import Notification from './Notification'
import {getAll, create, remove, update} from './services/phonebookService';




function App() {
  const [persons, setPersons] = useState<Person[]>([])
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPersonsAsync = async () => {
      const response = await getAll();
      setPersons(response);
      setFilteredPersons(response);
      console.log("Got the data")
    }

    fetchPersonsAsync();
  }, [])

  const handleNotification = (message: string | null, isError: boolean) => {
    setMessage(message);
    setIsError(isError);
    setTimeout(() => {
      setMessage(null);
      setIsError(false);
    }, 5000)
  }
  
  const handleDelete = async (id: string) => {
    try {
      await remove(id);
      handleNotification(`Successfully deleted entry with id ${id}`, false);
      setPersons(prev => prev.filter(person => person.id!== id));
      setFilteredPersons(prev => prev.filter(person => person.id!== id));
    } catch (error: any) {
      handleNotification(`Error deleting entry with id ${id}\nerror:${error?.message}` , true);
    }
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    if(existingPerson) {
      if(confirm("Do you want to overwrite the existing number for "+newName)){
        try{
          const updatedPerson = await update(existingPerson.id, {...existingPerson, number: newNumber});
          setPersons(prev => prev.map(person => person.name === updatedPerson.name ? updatedPerson: person));
          setFilteredPersons(prev => prev.map(person => person.name === updatedPerson.name ? updatedPerson: person));
          setNewName("");
          setNewNumber("");
          handleNotification(`Successfully updated ${existingPerson.name}`, false);
        }catch(error: any){
          handleNotification(`Error updating ${existingPerson.name}\nerror:${error?.message}`, true);
        }
      }
      return;
    }
    if(newName.length<1 || newNumber.length<1) {
      alert("Name and number must not be empty");
      return;
    }
    const newPerson = {
      id: ""+((persons?.length || 0) + 1),  // auto-increment id for each new person added
      name: newName,
      number: newNumber
    }
    try{
      const response = await create(newPerson);
      setPersons(prev => [...(prev || []), response])
      setFilteredPersons(prev => [...prev, response]); // update the filtered persons list as well
      setNewName('');
      setNewNumber('');
      handleNotification(`Successfully added ${newName}`, false);
    }catch(error: any){
      handleNotification(`Error adding entry: ${error?.message}`, true);
    }

  }
  


  return (
    <div>
      {message && <Notification message={message} isError={isError} />}
      <h2>Phonebook</h2>
    <Filter filterName={filterName} setFilterNameFunc={setFilterName} handleFilterChange={setFilteredPersons} persons={persons||[]} />
      <h3>Add a new entry</h3>
     <PersonForm submitForm={handleSubmit} name={newName} number={newNumber} setName={setNewName} setNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} DeleteFunc={handleDelete} />
    </div>
  );
}
export default App
