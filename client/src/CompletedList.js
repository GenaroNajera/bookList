import { useState } from 'react';
import Modal from './Modal.js';

function CompletedList(props) {
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
      editRating: children[2].innerText,
      editStarted: children[3].innerText,
      editFinished: children[4].innerText
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
      newRating: children[2].innerText,
      newStarted: children[3].innerText,
      newFinished: children[4].innerText
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

        <select
          name='newRating'
          onChange={e => handleChange(e, setBody)}
        >
          <option value='' hidden>Rating</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
        </select>

        <input
          placeholder='Date Started'
          name='newStarted'
          onChange={e => handleChange(e, setBody)}
          onFocus={e => e.target.type = 'date'}
        />

        <input
          placeholder='Date Finished'
          name='newFinished'
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
            <th>Rating</th>
            <th>Started (YYYY-MM-DD)</th>
            <th>Finished (YYYY-MM-DD)</th>
            <th colSpan='2'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map(v =>
            <tr key={v.id}>
              <td style={{width: '14.28%'}}>
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

              <td style={{width: '14.28%'}}>
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

              <td style={{width: '14.28%'}}>
                {editMode.enabled && editMode.rowID === v.id && editMode.colID === 2 ?
                  <select
                    name='editRating'
                    value={body.editRating}
                    onChange={e => handleChange(e, setBody)}
                    onBlur={() => blurCell(v.id)}
                    autoFocus
                  >
                    <option value=''>-</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                  </select>
                :
                  <span onClick={e => editCell(e, v.id, 2)}>{v.rating || '-'}</span>
                }
              </td>

              <td style={{width: '14.28%'}}>
                {editMode.enabled && editMode.rowID === v.id && editMode.colID === 3 ?
                  <input
                    type='date'
                    name='editStarted'
                    value={body.editStarted}
                    onChange={e => handleChange(e, setBody)}
                    onBlur={() => blurCell(v.id)}
                    autoFocus
                  />
                :
                  <span onClick={e => editCell(e, v.id, 3)}>{v.start_date || '-'}</span>
                }
              </td>

              <td style={{width: '14.28%'}}>
                {editMode.enabled && editMode.rowID === v.id && editMode.colID === 4 ?
                  <input
                    type='date'
                    name='editFinished'
                    value={body.editFinished}
                    onChange={e => handleChange(e, setBody)}
                    onBlur={() => blurCell(v.id)}
                    autoFocus
                  />
                :
                  <span onClick={e => editCell(e, v.id, 4)}>{v.finish_date || '-'}</span>
                }
              </td>

              <td style={{width: '14.28%'}}>
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

              <td style={{width: '14.28%'}}>
                <select className='form-select form-select-sm w-50 d-inline-block' onChange={e => moveTo(e)}>
                  <option value='' hidden>Move To</option>
                  <option value='current'>Current</option>
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

export default CompletedList;