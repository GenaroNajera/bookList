import { useState, useEffect } from 'react';
import CurrentList from'./CurrentList.js';
import CompletedList from'./CompletedList.js';
import NextList from'./NextList.js';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [list, setList] = useState('current'); // to know which list to display (current, completed, or next)

  function getData(route) {
    fetch(`http://localhost:5000/${route}`)
    .then(res => res.json())
    .then(data => {
      setData(data);
      setList(route);
    })
    .catch(err => {
      console.error(err);
    });
  }

  function postData(body) {
    fetch(`http://localhost:5000/${list}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(() => {
      getData(list);
    })
    .catch(err => {
      console.error(err);
    });
  }

  function putData(body, id) {
    fetch(`http://localhost:5000/${list}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(() => {
      getData(list);
    })
    .catch(err => {
      console.error(err);
    });
  }

  function deleteData(id) {
    fetch(`http://localhost:5000/${list}/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      getData(list);
    })
    .catch(err => {
      console.error(err);
    });
  }

  function handleChange(e, setBody) {
    const name = e.target.name;
    const value = e.target.value;
    setBody(values => ({...values, [name]: value}));
  }

  useEffect(() => {
    getData(list);
  }, []);

  return (
    <div className="App">
      <h1>Book List</h1>

      <div className='nav'>
        <h2 onClick={() => getData('completed')}>Completed</h2>
        <h2 onClick={() => getData('current')}>Current</h2>
        <h2 onClick={() => getData('next')}>Next</h2>
      </div>

      <div>
        {list === 'current' ?
          <CurrentList data={data} postData={postData} putData={putData} deleteData={deleteData} handleChange={handleChange} />
        : list === 'completed' ?
          <CompletedList data={data} postData={postData} putData={putData} deleteData={deleteData} handleChange={handleChange} />
        :
          <NextList data={data} postData={postData} putData={putData} deleteData={deleteData} handleChange={handleChange} />}
      </div>
    </div>
  );
}

export default App;