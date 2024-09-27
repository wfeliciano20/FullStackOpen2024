import React, { useEffect } from 'react'
interface props {
    persons: {
        name: string;
        number: string;
        id: number;
    }[]
    filterName: string,
    setFilterNameFunc: React.Dispatch<React.SetStateAction<string>>,
    handleFilterChange: React.Dispatch<React.SetStateAction<{
        name: string;
        number: string;
        id: number;
    }[]>>
  }

const Filter = ({filterName, setFilterNameFunc, handleFilterChange, persons}: props) => {
    useEffect(() => {
        handleFilterChange(persons.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase())))
        return () => {
          // cleanup function
    
        }
      }, [filterName])
  return (
    <div>
        Filter by name: <input value={filterName} onChange={(e) => setFilterNameFunc(e.target.value)} />
    </div>
  )
}

export default Filter