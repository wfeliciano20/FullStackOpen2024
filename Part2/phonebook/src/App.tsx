import { useEffect, useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import { Person } from './types/Person'
import {getAll, create, remove, update} from './services/phonebookService';




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
  
  const handleDelete = async (id: string) => {
    await remove(id);
    setPersons(prev => prev.filter(person => person.id!== id));
    setFilteredPersons(prev => prev.filter(person => person.id!== id));
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);
    if(existingPerson) {
      if(confirm("Do you want to overwrite the existing number for "+newName)){
        
        const updatedPerson = await update(existingPerson.id, {...existingPerson, number: newNumber});
        setPersons(prev => prev.map(person => person.name === updatedPerson.name ? updatedPerson: person));
        setFilteredPersons(prev => prev.map(person => person.name === updatedPerson.name ? updatedPerson: person));
        setNewName("");
        setNewNumber("");
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
      <Persons persons={filteredPersons} DeleteFunc={handleDelete} />
    </div>
  );
}
export default App
