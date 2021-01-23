import { combineReducers, createStore } from 'redux';

export const updateNewNameAction = (newName) => {
  return {
    type: 'UPDATE_NEW_NAME',
    newName,
  };
};

export const updateNewDescriptionAction = (newDescription) => {
  return {
    type: 'UPDATE_NEW_DESCRIPTION',
    newDescription,
  };
};

const newTask = (
  state = { name: 'New Name', description: 'New Description' },
  action,
) => {
  console.log('NewTask reducer');
  switch (action.type) {
    case 'UPDATE_NEW_NAME':
      return { ...state, name: action.newName };
    case 'UPDATE_NEW_DESCRIPTION':
      return {
        ...state,
        description: action.newDescription,
      };
    default:
      return state;
  }
};

export const setTasksAction = (tasks) => {
  return {
    type: 'SET_TASKS',
    tasks,
  };
};

export const addTaskAction = (task) => {
  return {
    type: 'ADD_TASK',
    task,
  };
};

export const removeTaskAction = (taskId) => {
  return {
    type: 'REMOVE_TASK',
    taskId,
  };
};

export const updateTaskAction = (task) => {
  return {
    type: 'UPDATE_TASK',
    task,
  };
};

const tasks = (state = [], action) => {
  console.log('Tasks reducer');
  switch (action.type) {
    case 'SET_TASKS':
      return action.tasks;
    case 'ADD_TASK':
      return [...state, action.task];
    case 'REMOVE_TASK':
      return state.filter((t) => t.id !== action.taskId);
    case 'UPDATE_TASK':
      return state.reduce((result, t) => {
        if (t.id == action.task.taskId) {
          result.push(action.task);
        } else {
          result.push(t);
        }
        return result;
      }, []);
    case 'TOGGLE_EDIT_MODE':
      console.log('editing tasks');
      const s = state.map((t) => {
        console.log({ t });
        return { ...t, name: 'EDIT' };
      });
      console.log({ s });
      return s;
    default:
      return state;
  }
};

export const setEditModeAction = () => {
  return {
    type: 'SET_EDIT_MODE',
  };
};

export const unsetEditModeAction = () => {
  return {
    type: 'UNSET_EDIT_MODE',
  };
};

export const toggleEditModeAction = () => {
  return {
    type: 'TOGGLE_EDIT_MODE',
  };
};

const editMode = (state = false, action) => {
  console.log('editMode reducer');
  switch (action.type) {
    case 'SET_EDIT_MODE':
      return true;
    case 'UNSET_EDIT_MODE':
      return false;
    case 'TOGGLE_EDIT_MODE':
      return !state;
    default:
      return state;
  }
};

const store = createStore(combineReducers({ newTask, tasks, editMode }));
// state = { newTask: {}, tasks: {} };
// const store = createStore(newTask);

export default store;
