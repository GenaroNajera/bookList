function NextList(props) {
  const {data, handleFormSubmit} = props;

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
          </tr>

          {data.map(v =>
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.description}</td>
              <td>Edit</td>
              <td>Remove</td>
              <td>Move</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='newDialog' id='newnext'>
        <p className='close' onClick={() => document.querySelector('#newnext').style.display = 'none'}>&times;</p>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor='title'>Title: </label>
          <input type='text' id='title' name='title' /><br />
          <label htmlFor='author'>Author: </label>
          <input type='text' id='author' name='author' /><br />
          <input type='submit' value='save' id='btn' />
        </form>
      </div>
    </>
  );
}

export default NextList;