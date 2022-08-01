import React, { Fragment, useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessages } from '../redux/actions/messageActions';
import { createCategory } from '../redux/actions/categoryActions';

const AdminCategoryModal = () => {

  const { successMsg, errorMsg } = useSelector(state => state.messages);
  const { loading } = useSelector(state => state.loading);

  const dispatch = useDispatch();
  
  const [category, setCategory] = useState('');
  const [clientSideErrorMsg, setClientSideErrorMsg] = useState('');

  const handleMessages = evt => {
    dispatch(clearMessages());
    setClientSideErrorMsg('');
  };

  const handleCategoryChange = evt => {
    dispatch(clearMessages());
    setCategory(evt.target.value);
  };

  const handleCategorySubmit = evt => {
    evt.preventDefault();

    if (isEmpty(category)) {
      setClientSideErrorMsg('Please enter a category');
    } else {
      const data = { category };
      dispatch(createCategory(data));
      setCategory('');
    }
  };

  return (
    <div id='addCategoryModal' className='modal' onClick={handleMessages}>
      <div className='modal-dialog modal-dialog-centered modal-lg'>
        <div className='modal-content'>
          <form onSubmit={handleCategorySubmit}>
            <div className='modal-header bg-info text-white'>
              <h5 className='modal-title'>Add Category</h5>
              <button className='close btn btn-outline-dark' data-bs-dismiss='modal'>
                <span>
                  <i className='fas fa-times'></i>
                </span>
              </button>
            </div>
            <div className='modal-body my-2'>
              {clientSideErrorMsg && showErrorMsg(clientSideErrorMsg)}
              {errorMsg && showErrorMsg(errorMsg)}
              {successMsg && showSuccessMsg(successMsg)}

              {loading ? (
                <div className='text-center'>
                  {showLoading()}
                </div>
              ) : (
                <Fragment>
                  <label className='text-secondary'>
                    Category
                  </label>
                  <input
                    type='text'
                    className='form-control'
                    name='category'
                    value={category}
                    onChange={handleCategoryChange}
                  />
                </Fragment>
              )}
            </div>
            <div className='modal-footer'>
              <button
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button type='submit' className='btn btn-info'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminCategoryModal