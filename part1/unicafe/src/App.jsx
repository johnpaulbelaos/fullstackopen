import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ value, text }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + bad + neutral
  const average = (good - +bad) / sum
  const positivePercentage = (+good / sum) * 100
  const checkNaN = (n) => Number.isNaN(n) ? 0 : n

  if (good + neutral + bad === 0) {
    return(
      <p>
        No feedback given
      </p>
    )
  } else {
    return(
    <table>
      <tbody>
        <StatisticLine value={good} text="good" /> 
        <StatisticLine value={neutral} text="neutral" />
        <StatisticLine value={bad} text="bad" /> 
        <StatisticLine value={sum} text="all" /> 
        <StatisticLine value={checkNaN(average)} text="average" />
        <StatisticLine value={checkNaN(positivePercentage) + " %"} text="positive" />
      </tbody>
    </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)




  return (
    <div>
      <h1>
        give feedback
      </h1>
      <Button onClick={incrementGood} text="good" />
      <Button onClick={incrementNeutral} text="neutral" />
      <Button onClick={incrementBad} text="bad" />
      <h1>
        statistics
      </h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App