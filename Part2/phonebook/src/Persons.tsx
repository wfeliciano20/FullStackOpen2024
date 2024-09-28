import React from 'react'
interface props{
    persons: {
        name: string;
        number: string;
        id: string;
    }[],
    DeleteFunc:  (id: string) => Promise<void>
}
const Persons = ({persons, DeleteFunc }: props) => {
  return (
    <div>
        {persons?.map(person => 
        <div key={person.id}>
          {person.name} {person.number} <button onClick={() => DeleteFunc(person.id)}>Delete</button>
        </div>
      )}
    </div>
  )
}

export default Persons