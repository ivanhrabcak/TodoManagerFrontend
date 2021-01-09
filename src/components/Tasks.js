import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Task } from './Task';

const useGetData = ({ url }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorCode, setErrorCode] = useState();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const sleep = async (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const getData = async () => {
      const token = await getAccessTokenSilently();

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setErrorCode(404);
        return;
      }

      setErrorCode(response.status);

      await sleep(5000);

      const json = await response.json();
      setData(json);
      setIsLoading(false);
    };

    getData();
  }, [getAccessTokenSilently, url]);

  return { data, setData, isLoading, errorCode };
};

const Tasks = () => {
  // const [tasks, setTasks] = useState([]);
  const { user } = useAuth0();
  const { data, setData, isLoading, errorCode } = useGetData({
    url: 'http://localhost:8080/tasks',
  });

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (errorCode && errorCode !== 200) {
    return <p>An error {errorCode} occurred</p>;
  }

  const fetchData = async () => {
    const response = await fetch('http://localhost:8080/tasks');
    setData(await response.json());
  };

  const createTask = async () => {
    const response = await fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'New Task',
        description: 'New Task Description',
      }),
    });

    setData([...data, await response.json()]);
  };

  const onTaskRemoved = async () => {
    fetchData();
  };

  return (
    <div>
      <h1>Hello {user.name}</h1>
      <h1 style={{ padding: '10px' }}>Todo List</h1>
      <button onClick={() => createTask()}>New Task</button>
      {data &&
        data.map((task) => {
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
