import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import { Person } from './types/Person'
import {getAll, create} from './services/phonebookService';




function App() {
  const [persons, setPersons] = useState<Person[]>([])
  const [filteredPersons, setFilteredPersons] = useState<Person[]>([])
  const [filterName, setFilterName] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    const fetchPersonsAsync = async () => {
      const response = await getAll();
      setPersons(response);
      setFilteredPersons(response);
      console.log("Got the data")
    }

    fetchPersonsAsync();
  }, [])
  
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
  if(persons?.some(person => person?.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    const newPerson = {
      id: ((persons?.length || 0) + 1),  // auto-increment id for each new person added
      name: newName,
      number: newNumber
    }
    const response = await create(newPerson);

    setPersons(prev => [...(prev || []), response])
    setFilteredPersons(prev => [...prev, response]); // update the filtered persons list as well
    setNewName('');
    setNewNumber('');
  }
  


  return (
    <div>
      <h2>Phonebook</h2>
    <Filter filterName={filterName} setFilterNameFunc={setFilterName} handleFilterChange={setFilteredPersons} persons={persons||[]} />
      <h3>Add a new entry</h3>
     <PersonForm submitForm={handleSubmit} name={newName} number={newNumber} setName={setNewName} setNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
}
export default App
