import './App.css';
import './index.css';
import Tasks from './components/Tasks';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const {
    isLoading,
    error,
    isAuthenticated,
    loginWithRedirect,
    logout,
  } = useAuth0();

  if (!isAuthenticated) {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Tasks />
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default App;
