function Modal(props) {
  let { id, deleteData } = props;

  return (
    <>
      <div className='modal fade' id={`modal${id}`}>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Remove Entry?</h4>
              <button type='button' className='btn-close' data-bs-dismiss='modal'></button>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-primary' data-bs-dismiss='modal'>Cancel</button>
              <button type='button' className='btn btn-danger' data-bs-dismiss='modal' onClick={() => deleteData(id)}>Remove</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;