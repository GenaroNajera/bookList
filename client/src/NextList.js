function NextList(props) {
  const {data, handleFormSubmit, handleChange, body, setBody, editData, deleteData} = props;

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
              <td style={{color: 'blue'}} onClick={() => {
                document.querySelector('#editnext').style.display = 'block';
                setBody(values => ({...values, nextid: v.id}));
              }}>Edit</td>
              <td style={{color: 'red'}} onClick={() => deleteData(v.id)}>Remove</td>
              <td>Move</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='dialog' id='newnext'>
        <p className='close' onClick={() => document.querySelector('#newnext').style.display = 'none'}>&times;</p>

        <form onSubmit={handleFormSubmit}>
          <label htmlFor='nextTitle'>Title: </label>
          <input type='text' id='nextTitle' name='nextTitle' value={body.nextTitle || ''} onChange={handleChange} /><br />
          <label htmlFor='nextAuthor'>Author: </label>
          <input type='text' id='nextAuthor' name='nextAuthor' value={body.nextAuthor || ''} onChange={handleChange} /><br />
          <input type='submit' value='save' id='btn' />
        </form>
      </div>

      <div className='dialog' id='editnext'>
        <p className='close' onClick={() => document.querySelector('#editnext').style.display = 'none'}>&times;</p>

        <form onSubmit={editData}>
          <label htmlFor='nextTitle'>Title: </label>
          <input type='text' id='nextTitle' name='nextTitle' value={body.nextTitle || ''} onChange={handleChange} /><br />
          <label htmlFor='nextAuthor'>Author: </label>
          <input type='text' id='nextAuthor' name='nextAuthor' value={body.nextAuthor || ''} onChange={handleChange} /><br />
          <input type='submit' value='save' id='btn' />
        </form>
      </div>
    </>
  );
}

export default NextList;