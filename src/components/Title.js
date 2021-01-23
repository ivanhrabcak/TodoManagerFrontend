import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleEditModeAction } from '../redux';

const Title = () => {
  const dispatch = useDispatch();

  const editMode = useSelector((state) => state.editMode);

  return (
    <div>
      <h1 className="padded">Todo List</h1>
      <button onClick={() => dispatch(toggleEditModeAction())}>
        {editMode && <>{'Turn off edit mode'}</>}
        {!editMode && <>{'Turn on edit mode'}</>}
      </button>
    </div>
  );
};

export default Title;
