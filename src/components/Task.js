import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Api from '../Api';
import { useAuth0 } from '@auth0/auth0-react';

const Task = ({ taskData, onTaskRemoved }) => {
    const [task, setTask] = useState(taskData);
    const [taskName, setTaskName] = useState(task.name);
    const [taskDescription, setTaskDescription] = useState(task.description);
    const [isTaskDone, setIsTaskDone] = useState(task.done);
    const { getAccessTokenSilently } = useAuth0();

    const onTaskChanged = async (name, description) => {
        const newTask = { ...task, name, description };

        const updatedTask = await Api.modifyTask(newTask, await getAccessTokenSilently());


        setTask(updatedTask);
        setTaskName(name);
        setTaskDescription(description);
    };

    const onTaskToggle = async (isDone) => {
        let response = await Api.toggleTask(task.id, await getAccessTokenSilently());

        response = await response.json();


        if (response == null) {
            console.error('Failed to update task!');
        }
        else {
            setIsTaskDone(isDone);
        }
    };

    const remove = async () => {
        await Api.removeTask(task.id, await getAccessTokenSilently());
        onTaskRemoved(task);
    };

    return (
        <div className="d-flex justify-content-center" style={{ padding: '10px' }}>
        <div className="d-flex align-items-center flex-column">
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="task-checkbox"
              checked={isTaskDone}
              onChange={(e) => {
                onTaskToggle(e.target.checked);
              }}
            />
            <div className="d-flex align-items-center flex-column Task-description">
              <input
                value={taskName}
                className="task-title"
                onChange={(e) => {
                    onTaskChanged(e.target.value, taskDescription);
                }}
              />
              <input
                value={taskDescription}
                className="task-description"
                onChange={(e) => {
                    onTaskChanged(taskName, e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      <button
        className="Task-remove-button"
        style={{
          border: 'white',
          backgroundColor: '#d11a2a',
          height: '100%',
          transform: 'translate(0%, 50%)',
        }}
        onClick={() => {
          remove();
        }}>
        x
      </button>
    </div>
    );
};

export { Task };