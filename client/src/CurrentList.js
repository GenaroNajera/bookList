import { useState } from 'react';
import Modal from './Modal.js';

function CurrentList(props) {
  const {data, postData, putData, deleteData, handleChange} = props;
  const [body, setBody] = useState({});
  const [editMode, setEditMode] = useState({enabled: false, rowID: null, colID: null});
  const [moveToList, setMoveToList] = useState('');

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

  function moveTo(e) {
    const children = e.target.parentElement.parentElement.children;

    setBody(values => ({
      ...values,
      newTitle: children[0].innerText,
      newAuthor: children[1].innerText,
      newStarted: children[2].innerText,
      newBookmark: children[3].innerText
    }));

    setMoveToList(e.target.value);
  }

  return (
    <>
      <div className='d-flex justify-content-center'>
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

      <table className='table table-striped table-bordered table-sm text-center'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Started (YYYY-MM-DD)</th>
            <th>Bookmark</th>
            <th colSpan='2'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map(v =>
            <tr key={v.id}>
              <td style={{width: '16.66%'}}>
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
                  <span onClick={e => editCell(e, v.id, 0)}>{v.title || '-'}</span>
                }
              </td>

              <td style={{width: '16.66%'}}>
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
                  <span onClick={e => editCell(e, v.id, 1)}>{v.author || '-'}</span>
                }
              </td>

              <td style={{width: '16.66%'}}>
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
                  <span onClick={e => editCell(e, v.id, 2)}>{v.start_date || '-'}</span>
                }
              </td>

              <td style={{width: '16.66%'}}>
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
                  <span onClick={e => editCell(e, v.id, 3)}>{v.bookmark || '-'}</span>
                }
              </td>

              <td style={{width: '16.66%'}}>
                <button
                  type='button'
                  className='btn text-danger'
                  data-bs-toggle='modal'
                  data-bs-target={`#modal${v.id}`}
                >
                  Remove
                </button>

                <Modal id={v.id} deleteData={deleteData} />
              </td>

              <td style={{width: '16.66%'}}>
                <select className='form-select form-select-sm w-50 d-inline-block' onChange={e => moveTo(e)}>
                  <option value='' hidden>Move To</option>
                  <option value='completed'>Completed</option>
                  <option value='next'>Next</option>
                </select>

                <button type='button' onClick={e => {
                  if(e.target.parentElement.children[0].value) {
                    postData(body, moveToList);
                    deleteData(v.id);
                  }
                }}>
                  Move
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default CurrentList;