import { useState, useEffect } from 'react';
import CurrentList from'./CurrentList.js';
import CompletedList from'./CompletedList.js';
import NextList from'./NextList.js';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [list, setList] = useState('current'); // to know which list to display (current, completed, or next)
  const [body, setBody] = useState({}); // information for POST and PUT methods

  useEffect(() => {
    getData(list);
  },[]);

  function getData(route) {
    fetch(`http://localhost:5000/${route}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      setData(data);
      setList(route);
    })
    .catch(err => {
      console.error(err);
    });
  }

  function editData(e) {
    e.preventDefault();

    fetch(`http://localhost:5000/${list}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    document.querySelector(`#edit${list}`).style.display = 'none';
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:5000/${list}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    document.querySelector(`#new${list}`).style.display = 'none';
  }

  function deleteData(id) {
    fetch(`http://localhost:5000/${list}/${id}`, {
      method: 'DELETE'
    });
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setBody(values => ({...values, [name]: value}));
  }

  return (
    <div className="App">
      <h1>Book List</h1>

      <div className='nav'>
        <h2 onClick={() => getData('completed')}>Completed</h2>
        <h2 onClick={() => getData('current')}>Current</h2>
        <h2 onClick={() => getData('next')}>Next</h2>
      </div>

      <h2 id='new' onClick={() => document.querySelector(`#new${list}`).style.display = 'block'}>New {list} entry</h2> 

      <div>
      {list === 'current' ? <CurrentList data={data} handleFormSubmit={handleFormSubmit} handleChange={handleChange} body={body} setBody={setBody} editData={editData} deleteData={deleteData} />
        : list === 'completed' ? <CompletedList data={data} handleFormSubmit={handleFormSubmit} handleChange={handleChange} body={body} setBody={setBody} editData={editData} deleteData={deleteData} />
        : <NextList data={data} handleFormSubmit={handleFormSubmit} handleChange={handleChange} body={body} setBody={setBody} editData={editData} deleteData={deleteData} />}
      </div>

      {/* <form id='newDialog' style={{display: 'none'}} onSubmit={handleFormSubmit}>
        <input type='date' id='postDate' name='pdate' value={b.pdate || ""} onChange={handleChange}/>
        <input id='postInput' maxLength='20' name='pinput' value={b.pinput || ""} onChange={handleChange}/>
        <input type='submit' value='save' id='btn' />
      </form> */}
    </div>
  );
}

export default App;