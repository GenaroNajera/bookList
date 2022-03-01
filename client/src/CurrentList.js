function CurrentList(props) {
  const {data, handleFormSubmit, handleChange, body, setBody, editData, deleteData} = props;

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Started</th>
            <th>Bookmark</th>
          </tr>

          {data.map(v =>
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.description}</td>
              <td><input type='date' /></td>
              <td><input type='number' placeholder={v.id} /></td>
              <td style={{color: 'blue'}} onClick={() => {
                document.querySelector('#editcurrent').style.display = 'block';
                setBody(values => ({...values, currentid: v.id}));
              }}>Edit</td>
              <td style={{color: 'red'}} onClick={() => deleteData(v.id)}>Remove</td>
              <td>Move</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='dialog' id='newcurrent'>
        <p className='close' onClick={() => document.querySelector('#newcurrent').style.display = 'none'}>&times;</p>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor='currentTitle'>Title: </label>
          <input type='text' id='currentTitle' name='currentTitle' value={body.currentTitle || ''} onChange={handleChange} /><br />
          <label htmlFor='currentAuthor'>Author: </label>
          <input type='text' id='currentAuthor' name='currentAuthor' value={body.currentAuthor || ''} onChange={handleChange} /><br />
          <label htmlFor='currentStarted'>Date Started: </label>
          <input type='date' id='currentStarted' name='currentStarted' value={body.currentStarted || ''} onChange={handleChange} /><br />
          <input type='submit' value='save' id='btn' />
        </form>
      </div>

      <div className='dialog' id='editcurrent'>
        <p className='close' onClick={() => document.querySelector('#editcurrent').style.display = 'none'}>&times;</p>

        <form onSubmit={editData}>
          <label htmlFor='currentTitle'>Title: </label>
          <input type='text' id='currentTitle' name='currentTitle' value={body.currentTitle || ''} onChange={handleChange} /><br />
          <label htmlFor='currentAuthor'>Author: </label>
          <input type='text' id='currentAuthor' name='currentAuthor' value={body.currentAuthor || ''} onChange={handleChange} /><br />
          <label htmlFor='currentStarted'>Date Started: </label>
          <input type='date' id='currentStarted' name='currentStarted' value={body.currentStarted || ''} onChange={handleChange} /><br />
          <input type='submit' value='save' id='btn' />
        </form>
      </div>
    </>
  );
}

export default CurrentList;