import { useState, useEffect } from 'react';
import CurrentList from'./CurrentList.js';
import CompletedList from'./CompletedList.js';
import NextList from'./NextList.js';

function App() {
  const [data, setData] = useState([]);
  const [list, setList] = useState('current');

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

  function postData(body, lst = list) {
    fetch(`http://localhost:5000/${lst}`, {
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

  function selected(e) {
    document.querySelectorAll('h3').forEach(v => v.className = '');

    e.target.className = 'text-info text-decoration-underline';
  }

  useEffect(() => {
    getData(list);
  }, []);

  return (
    <div className="App">
      <div className='display-2 text-center'>Book List</div>

      <div className='d-flex justify-content-evenly'>
        <h3 onClick={e => {getData('completed'); selected(e);}} style={{cursor: 'pointer'}}>Completed</h3>
        <h3 className='text-info text-decoration-underline' onClick={e => {getData('current'); selected(e);}} style={{cursor: 'pointer'}}>Current</h3>
        <h3 onClick={e => {getData('next'); selected(e);}} style={{cursor: 'pointer'}}>Next</h3>
      </div>

      <div>
        {list === 'current' ?
          <CurrentList data={data} postData={postData} putData={putData} deleteData={deleteData} handleChange={handleChange} />
        : list === 'completed' ?
          <CompletedList data={data} postData={postData} putData={putData} deleteData={deleteData} handleChange={handleChange} />
        :
          <NextList data={data} postData={postData} putData={putData} deleteData={deleteData} handleChange={handleChange} />
        }
      </div>
    </div>
  );
}

export default App;