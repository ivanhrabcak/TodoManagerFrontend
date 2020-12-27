import './App.css';
import "./index.css";
import { useEffect, useState } from 'react';
import { Task } from "./components/Task";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
      fetch('http://localhost:8080/tasks')
      .then(async response => setTasks(await response.json()));
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const createTask = () => {
    fetch('http://localhost:8080/tasks/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'New Task',
        description: 'New Task Description'
      })
    })
      .then(async response => setTasks([...tasks, await response.json()]));
  }

  const removeTask = (task) => {
    fetch(`http://localhost:8080/tasks/delete/${task.id}`, {
      method: 'POST'
    })
      .then(() => {
        setTasks([]);
        fetchData()
      });
  }

  return (
    <div className="App">
      <h1 style={{padding: "10px"}}>Todo List</h1>
      {tasks.map((task) => {
        console.log(task);
        return (
          <div className='d-flex justify-content-center' style={{padding: "10px"}}>
            <Task taskData={task} />
            <button
              style={{
                  border: "white",
                  backgroundColor: "#d11a2a",
                  height: "100%",
                  transform: "translate(0%, 50%)"
              }}
              onClick={() => {
                removeTask(task);
              }}
            >x</button>
          </div>
        );
      })}
      <button onClick={() => createTask() }>New Task</button>
    </div>
  );
}

export default App;
