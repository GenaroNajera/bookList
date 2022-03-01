function CompletedList(props) {
  const {data, handleFormSubmit, handleChange, body, setBody, editData, deleteData} = props;

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Rating</th>
            <th>Started</th>
            <th>Finished</th>
          </tr>

          {data.map(v =>
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.description}</td>
              <td><input type='number' max='5' /></td>
              <td><input type='date' /></td>
              <td><input type='date' /></td>
              <td style={{color: 'blue'}} onClick={() => {
                document.querySelector('#editcompleted').style.display = 'block';
                setBody(values => ({...values, completedid: v.id}));
              }}>Edit</td>
              <td style={{color: 'red'}} onClick={() => deleteData(v.id)}>Remove</td>
              <td>Move</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='dialog' id='newcompleted'>
        <p className='close' onClick={() => document.querySelector('#newcompleted').style.display = 'none'}>&times;</p>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor='completedTitle'>Title: </label>
          <input type='text' id='completedTitle' name='completedTitle' value={body.completedTitle || ''} onChange={handleChange} /><br />
          <label htmlFor='completedAuthor'>Author: </label>
          <input type='text' id='completedAuthor' name='completedAuthor' value={body.completedAuthor || ''} onChange={handleChange} /><br />
          <label htmlFor='rating'>Rating: </label>
          <input type='number' id='rating' name='rating' value={body.rating || ''} onChange={handleChange} min='1' max='5' /><br />
          <label htmlFor='completedStarted'>Date Started: </label>
          <input type='date' id='completedStarted' name='completedStarted' value={body.completedStarted || ''} onChange={handleChange} /><br />
          <label htmlFor='completed'>Date Completed: </label>
          <input type='date' id='completed' name='completed' value={body.completed || ''} onChange={handleChange} /><br />
          <input type='submit' value='save' id='btn' />
        </form>
      </div>

      <div className='dialog' id='editcompleted'>
        <p className='close' onClick={() => document.querySelector('#editcompleted').style.display = 'none'}>&times;</p>

        <form onSubmit={editData}>
          <label htmlFor='completedTitle'>Title: </label>
          <input type='text' id='completedTitle' name='completedTitle' value={body.completedTitle || ''} onChange={handleChange} /><br />
          <label htmlFor='completedAuthor'>Author: </label>
          <input type='text' id='completedAuthor' name='completedAuthor' value={body.completedAuthor || ''} onChange={handleChange} /><br />
          <label htmlFor='rating'>Rating: </label>
          <input type='number' id='rating' name='rating' value={body.rating || ''} onChange={handleChange} min='1' max='5' /><br />
          <label htmlFor='completedStarted'>Date Started: </label>
          <input type='date' id='completedStarted' name='completedStarted' value={body.completedStarted || ''} onChange={handleChange} /><br />
          <label htmlFor='completed'>Date Completed: </label>
          <input type='date' id='completed' name='completed' value={body.completed || ''} onChange={handleChange} /><br />
          <input type='submit' value='save' id='btn' />
        </form>
      </div>
    </>
  );
}

export default CompletedList;