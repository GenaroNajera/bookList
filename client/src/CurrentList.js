import { useState } from 'react';

function CurrentList(props) {
  const {data, postData, putData, deleteData, handleChange} = props;
  const [body, setBody] = useState({});
  const [editMode, setEditMode] = useState({enabled: false, rowID: null, colID: null});

  function editCell(e, rowid, colid) {
    const children = e.target.parentElement.parentElement.children;

    setBody(values => ({
      ...values,
      editTitle: children[0].innerText,
      editAuthor: children[1].innerText,
      editStarted: children[2].innerText,
      editBookmark: children[3].innerText
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
        <input
          placeholder='Date Started'
          name='newStarted'
          onChange={e => handleChange(e, setBody)}
          onFocus={e => e.target.type = 'date'}
        />

        <button type='button' onClick={() => postData(body)}>Save</button>
      </div><br />

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Started (YYYY-MM-DD)</th>
            <th>Bookmark</th>
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
              <td>
                {editMode.enabled && editMode.rowID === v.id && editMode.colID === 2 ?
                  <input
                    type='date'
                    name='editStarted'
                    value={body.editStarted}
                    onChange={e => handleChange(e, setBody)}
                    onBlur={() => blurCell(v.id)}
                    autoFocus
                  />
                :
                  <span onClick={e => editCell(e, v.id, 2)}>{v.start_date || '-'}</span>}
              </td>
              <td>
                {editMode.enabled && editMode.rowID === v.id && editMode.colID === 3 ?
                  <input
                    type='number'
                    style={{width: '3.5em'}}
                    name='editBookmark'
                    value={body.editBookmark}
                    onChange={e => handleChange(e, setBody)}
                    onBlur={() => blurCell(v.id)}
                    autoFocus
                  />
                :
                  <span onClick={e => editCell(e, v.id, 3)}>{v.bookmark || '-'}</span>}
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

export default CurrentList;