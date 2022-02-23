function CompletedList(props) {
  const {data, handleFormSubmit} = props;

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
              <td>Edit</td>
              <td>Remove</td>
              <td>Move</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='newDialog' id='newcompleted'>
        <p className='close' onClick={() => document.querySelector('#newcompleted').style.display = 'none'}>&times;</p>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor='title'>Title: </label>
          <input type='text' id='title' name='title' /><br />
          <label htmlFor='author'>Author: </label>
          <input type='text' id='author' name='author' /><br />
          <label htmlFor='rating'>Rating: </label>
          <input type='number' id='rating' min='1' max='5' /><br />
          <label htmlFor='started'>Date Started: </label>
          <input type='date' id='started' name='started' /><br />
          <label htmlFor='completed'>Date Completed: </label>
          <input type='date' id='completed' name='completed' /><br />
          <input type='submit' value='save' id='btn' />
        </form>
      </div>
    </>
  );
}

export default CompletedList;