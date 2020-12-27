import { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Checkbox } from "pretty-checkbox-react";

const Task = ({ taskData }) => {
    const [task, setTask] = useState(taskData);
    const [taskName, setTaskName] = useState(task.name);
    const [taskDescription, setTaskDescription] = useState(task.description);
    const [isTaskDone, setIsTaskDone] = useState(task.done);
    
    const isInitialRender = useRef(true);
    const isTaskDeleted = useRef(false);

    useEffect(() => {
        if (isInitialRender.current) {
            return;
        }

        const newTask = { ...task, name: taskName, description: taskDescription }; 

        fetch(`http://localhost:8080/tasks/update/${task.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        })
            .then(async response => {
                console.log(await response.json());
                if (response.json == null) {
                    console.log("Failed to update task!");
                }
            });
        
    }, [taskName, taskDescription]);

    useEffect(() => {
        if (isInitialRender.current) {
            console.log("Initial render!");
            isInitialRender.current = false;
            return;
        }

        console.log("isTaskDone changed!");

        fetch(`http://localhost:8080/tasks/toggle/${task.id}`, {
            method: 'POST',
        })
            .then(async response => {
                if (response.json == null) {
                    console.log("Failed to update task!");
                }
            });
    }, [isTaskDone]);

    if (isTaskDeleted.current) {
        setTask({});
        return (<div/>)
    }

    return (
        <div className="d-flex align-items-center flex-column">
            <div className="d-flex align-items-center">
                <input type="checkbox" className="task-checkbox" checked={isTaskDone} onChange={(e) => { setIsTaskDone(e.target.checked) }} />
                <div className="d-flex align-items-center flex-column" style={{padding: '10px'}}>
                    <input value={task.name}
                        className="task-title"
                        onChange={(e) => { setTaskName(e.target.value) }} />
                    <input value={taskDescription}
                        className="task-description"
                        onChange={(e) => { setTaskDescription(e.target.value) }} />
                </div>
            </div>
        </div>
    );
};

export { Task };