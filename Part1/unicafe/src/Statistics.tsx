import React from 'react'
// import StatisticLine from './StatisticLine';
interface props{
    good: number,
    neutral: number,
    bad: number,
  
};

const Statistics = (props: props) => {
    const { good, neutral, bad } = props;
    if(good+neutral+bad===0){
        return(
            <p>No feedback given</p>
        )
    }
  return (
    <div>
        <h2>Statistics</h2>
        <table>
            <tbody>
                <tr>
                    <td>good</td><td>{good}</td>
                </tr>
                <tr>
                    <td>neutral</td><td>{neutral}</td>
                </tr>
                <tr>
                    <td>bad</td><td>{bad}</td>
                </tr>
                <tr>
                    <td>all</td><td>{good+neutral+bad}</td>
                </tr>
                <tr>
                    <td>average</td><td>{(((good * 1) + (neutral * 0) + (bad * -1)) / (good + neutral + bad)).toFixed(1)}</td>
                </tr>
                <tr>
                    <td>positive</td><td>{((good/(good+bad+neutral))*100).toFixed(1)}{'%'}</td>
                </tr>
            </tbody>
        </table>
        {/* <div>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"all"} value={(good + neutral + bad)} />
            <StatisticLine text={"average"} value={((good * 1)+ (neutral*0) + (bad*-1))/(good+neutral+bad)} />
            <StatisticLine text={"positive"} value={((good/(good+bad+neutral))*100)} />
        </div> */}
    </div>
  )
}

export default Statistics