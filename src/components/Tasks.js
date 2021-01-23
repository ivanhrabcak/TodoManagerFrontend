import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Task } from './Task';
import * as Api from '../Api';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTaskAction,
  setTasksAction,
  updateNewDescriptionAction,
  updateNewNameAction,
} from '../redux';

const useGetData = (selector, action) => {
  //   const [data, setData] = useState([]);
  const data = useSelector(selector);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const token = await getAccessTokenSilently();
      dispatch(action(await Api.fetchTasks(token)));
      setIsLoading(false);
    };

    getData();
  }, [getAccessTokenSilently]);

  return { data, isLoading, getAccessTokenSilently };
};

const Tasks = () => {
  const { data, isLoading, getAccessTokenSilently } = useGetData(
    (state) => state.tasks,
    setTasksAction,
  );

  const state = useSelector((state) => state);

  const newName = useSelector((state) => {
    return state.newTask.name;
  });
  const newDescription = useSelector((state) => state.newTask.description);

  const isEditable = useSelector((state) => state.editMode);

  const dispatch = useDispatch();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const onTaskRemoved = async () => {
    dispatch(
      setTasksAction(await Api.fetchTasks(await getAccessTokenSilently())),
    );
  };

  const onNameChanged = (name) => {
    dispatch(updateNewNameAction(name));
  };

  const onDescriptionChanged = (description) => {
    dispatch(updateNewDescriptionAction(description));
  };

  console.log({ data });

  return (
    <>
      <div className="d-flex align-items-center flex-column Task-description">
        <input
          value={newName}
          className="task-title"
          onChange={(e) => {
            onNameChanged(e.target.value);
          }}
        />
        <input
          value={newDescription}
          className="task-description"
          onChange={(e) => {
            onDescriptionChanged(e.target.value);
          }}
        />
      </div>
      <button
        onClick={async () => {
          dispatch(
            addTaskAction(
              await Api.createTask(
                await getAccessTokenSilently(),
                newName,
                newDescription,
              ),
            ),
          );
        }}>
        Add Task
      </button>
      {data &&
        data.map((task) => {
          return (
            <Task
              key={`task-${task.id}`}
              taskId={task.id}
              onTaskRemoved={onTaskRemoved}
              isEditable={isEditable}
            />
          );
        })}
    </>
  );
};

export { Tasks };
