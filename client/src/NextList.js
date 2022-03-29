import { useState } from 'react';

function NextList(props) {
  const {data, postData, putData, deleteData, handleChange} = props;
  const [body, setBody] = useState({});
  const [editMode, setEditMode] = useState({enabled: false, rowID: null, colID: null});

  function editCell(e, rowid, colid) {
    const children = e.target.parentElement.parentElement.children;

    setBody(values => ({
      ...values,
      editTitle: children[0].innerText,
      editAuthor: children[1].innerText
    }));

    setEditMode({enabled: true, rowID: rowid, colID: colid});
  }

  function blurCell(id) {
    putData(body, id);
    setEditMode({enabled: false, rowID: null, colID: null});
  }

  return (
    <>
      <div className='container'>
        <input
          placeholder='Title'
          name='newTitle'
          onChange={e => handleChange(e, setBody)}
          maxLength='50'
        />
        <input
          placeholder='Author'
          name='newAuthor'
          onChange={e => handleChange(e, setBody)}
          maxLength='50'
        />

        <button type='button' onClick={() => postData(body)}>Save</button>
      </div><br />

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>

          {data.map(v =>
            <tr key={v.id}>
              <td>
                {editMode.enabled && editMode.rowID === v.id && editMode.colID === 0 ?
                  <input
                    name='editTitle'
                    value={body.editTitle}
                    onChange={e => handleChange(e, setBody)}
                    onBlur={() => blurCell(v.id)}
                    maxLength='50'
                    autoFocus
                  />
                :
                  <span onClick={e => editCell(e, v.id, 0)}>{v.title || '-'}</span>}
              </td>
              <td>
                {editMode.enabled && editMode.rowID === v.id && editMode.colID === 1 ?
                  <input
                    name='editAuthor'
                    value={body.editAuthor}
                    onChange={e => handleChange(e, setBody)}
                    onBlur={() => blurCell(v.id)}
                    maxLength='50'
                    autoFocus
                  />
                :
                  <span onClick={e => editCell(e, v.id, 1)}>{v.author || '-'}</span>}
              </td>
              <td style={{color: 'red'}} onClick={() => deleteData(v.id)}>Remove</td>
              <td>Move</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default NextList;