import { useState } from 'react';

function NextList(props) {
  const {data, postData, putData, deleteData, handleChange} = props;
  const [body, setBody] = useState({});
  const [editMode, setEditMode] = useState({enabled: false, rowID: null, colID: null});
  const [moveToList, setMoveToList] = useState('');

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

  function moveTo(e) {
    const children = e.target.parentElement.parentElement.children;

    setBody(values => ({
      ...values,
      newTitle: children[0].innerText,
      newAuthor: children[1].innerText
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

        <button type='button' onClick={() => postData(body)}>Save</button>
      </div><br />

      <table className='table table-striped table-bordered table-sm text-center'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th colSpan='2'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map(v =>
            <tr key={v.id}>
              <td className='w-25'>
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

              <td className='w-25'>
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

              <td className='w-25'>
                <button
                  type='button'
                  className='btn text-danger'
                  data-bs-toggle='modal'
                  data-bs-target={`#modal${v.id}`}
                >
                  Remove
                </button>

                <div className='modal fade' id={`modal${v.id}`}>
                  <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                      <div className='modal-header'>
                        <h4 className='modal-title'>Remove Entry?</h4>
                        <button type='button' className='btn-close' data-bs-dismiss='modal'></button>
                      </div>
                      <div className='modal-footer'>
                        <button type='button' className='btn btn-primary' data-bs-dismiss='modal'>Cancel</button>
                        <button type='button' className='btn btn-danger' data-bs-dismiss='modal' onClick={() => deleteData(v.id)}>Remove</button>
                      </div>
                    </div>
                  </div>
                </div>
              </td>

              <td className='w-25'>
                <select className='form-select form-select-sm w-50 d-inline-block' onChange={e => moveTo(e)}>
                  <option value='' hidden>Move To</option>
                  <option value='current'>Current</option>
                  <option value='completed'>Completed</option>
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

export default NextList;