import React from 'react'
interface props{
    text: string,
    value: number,
}
const StatisticLine = (props: props) => {
    const { text, value } = props;
  return (
    <p>{text} {value||0} {text === 'positive'? '%':null}</p>
  )
}

export default StatisticLine