import React from 'react'
interface props{
    message: string | null,
    isError: boolean
}
const Notification = ({message, isError} : props) => {
  return (
    <div className={isError? 'error':'success'}>
        {message}
    </div>
  )
}

export default Notification