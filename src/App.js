import './App.css';
import "./index.css";
import { Tasks } from "./components/Tasks";
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const { isLoading, error, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (!isAuthenticated) {
    return (
      <div className="d-flex flex-column justify-content-center">
        <h1 className="mx-auto">You have to log in to use this app.</h1>
        <button className="mx-auto margin" onClick={ loginWithRedirect }>Log in</button>
      </div>
    );
  }

  return (
    <div className="App">
      <Tasks />
    </div>
  );
}

export default App;