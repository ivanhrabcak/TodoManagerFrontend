import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Task } from './Task';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const { user, getAccessTokenSilently } = useAuth0();

  const fetchData = async () => {
    const response = await fetch('http://localhost:8080/tasks');
    setTasks(await response.json());
  };

  useEffect(() => {
    fetchData();

    const getToken = async () => {
      const token = await getAccessTokenSilently({
        audience: 'http://localhost:8080',
        scope: '',
      });

      console.log(token);
    };

    getToken();
  }, []);

  const createTask = async () => {
    const response = await fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'New Task',
        description: 'New Task Description',
      }),
    });

    setTasks([...tasks, await response.json()]);
  };

  const onTaskRemoved = async () => {
    fetchData();
  };

  return (
    <div>
      <h1>Hello {user.name}</h1>
      <h1 style={{ padding: '10px' }}>Todo List</h1>
      <button onClick={() => createTask()}>New Task</button>
      {tasks.map((task) => {
        console.log(task);
        return (
          <Task
            key={`task-${task.id}`}
            taskData={task}
            onTaskRemoved={onTaskRemoved}
          />
        );
      })}
    </div>
  );
};

export default Tasks;
