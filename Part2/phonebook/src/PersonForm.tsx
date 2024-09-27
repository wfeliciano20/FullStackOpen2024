import React from 'react'
interface props{
    submitForm:  (e: React.FormEvent<HTMLFormElement>) => void,
    name: string,
    number: string,
    setName: React.Dispatch<React.SetStateAction<string>>
    setNumber: React.Dispatch<React.SetStateAction<string>>
}
const PersonForm = ({submitForm,name,number,setName,setNumber}: props) => {
  return (
    <form onSubmit={e => submitForm(e)}>
    <div>
      name: <input name="name" value={name} onChange={(e) => setName(e.target.value)} />
    </div>
    <div>
      number: <input name="number" value={number} onChange={e => setNumber(e.target.value)} />
    </div>

    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm