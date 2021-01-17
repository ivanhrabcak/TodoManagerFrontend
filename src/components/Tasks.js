import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react'
import { Task } from './Task';
import * as Api from '../Api';

const useGetData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const getData = async () => {
            const token = await getAccessTokenSilently();
            setData(await Api.fetchTasks(token));
            setIsLoading(false);
        };

        getData();
    }, [getAccessTokenSilently]);
  
    return { data, setData, isLoading, getAccessTokenSilently };
};

const Tasks = () => {
    const { data, setData, isLoading, getAccessTokenSilently } = useGetData();

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    const onTaskRemoved = async () => {
        setData(await Api.fetchTasks(await getAccessTokenSilently()));
    };

    return (
    <>
        <h1 className='padded'>Todo List</h1>
        <button onClick={ async () => {setData(...data, await Api.createTask(await getAccessTokenSilently()))} }>Add Task</button>
        {data &&
            data.map((task) => {
                return <Task
                key={`task-${task.id}`}
                taskData={ task }
                onTaskRemoved= { onTaskRemoved }
                />
            })
        }
    </>

    );
};

export { Tasks };