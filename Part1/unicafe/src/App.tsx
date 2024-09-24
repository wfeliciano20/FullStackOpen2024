import { useState } from 'react'
import Statistics from './Statistics'
import Button from './Button'


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <>
     <h1>Give Feedback</h1>
     <div>
      <Button display={"good"} actionFunc={setGood} />
      <Button display={"neutral"} actionFunc={setNeutral} />
      <Button display={"bad"} actionFunc={setBad} />
      
    </div>
    <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
