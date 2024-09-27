import React from 'react'
interface props{
    persons: {
        name: string;
        number: string;
        id: number;
    }[]
}
const Persons = ({persons}: props) => {
  return (
    <div>
        {persons?.map(person => 
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      )}
    </div>
  )
}

export default Persons