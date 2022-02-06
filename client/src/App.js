import { useState, useEffect } from 'react';
import CurrentList from'./CurrentList.js';
import CompletedList from'./CompletedList.js';
import NextList from'./NextList.js';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [list, setList] = useState('current');

  useEffect(() => {
    fetch('http://localhost:5000/current')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setData(data);
    })
    .catch(err => {
      console.error(err);
    });
  },[]);

  function getData(route) {
    fetch(`http://localhost:5000/${route}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setData(data);
      setList(route);
    })
    .catch(err => {
      console.error(err);
    });
  }

  return (
    <div className="App">
      <h1>Book List</h1>

      <div className='nav'>
        <h2 onClick={() => getData('completed')}>Completed</h2>
        <h2 onClick={() => getData('current')}>Current</h2>
        <h2 onClick={() => getData('next')}>Next</h2>
      </div>

      <div>
      {list === 'current' ? <CurrentList data={data} />
        : list === 'completed' ? <CompletedList data={data} />
        : <NextList data={data} />}
      </div>
    </div>
  );
}

export default App;