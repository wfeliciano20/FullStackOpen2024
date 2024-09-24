import React from 'react'
interface props{
    display: string,
    actionFunc: React.Dispatch<React.SetStateAction<number>>
}
const Button = (props: props) => {
const { display, actionFunc } = props;
  return (
    <button onClick={() =>actionFunc((prev: number) => prev + 1)}>{display}</button>
  )
}
export default Button