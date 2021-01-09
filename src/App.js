import './App.css';
import "./index.css";
import { Tasks } from "./components/Tasks";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  return (
    <div className="App">
      <Tasks />
    </div>
  );
}

export default App;
