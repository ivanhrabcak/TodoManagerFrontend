import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const TaskDetail = () => {
  const { taskId } = useParams();

  return (
    <div className="d-flex justify-content-center" style={{ padding: '10px' }}>
      <div className="d-flex align-items-center flex-column">
        <div className="d-flex align-items-center">
          <h2>This is task detail {taskId}</h2>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
