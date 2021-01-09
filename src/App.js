import './App.css';
import './index.css';
import Tasks from './components/Tasks';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

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
    <Router>
      <div className="App">
        <div>
          <Link to="/">Home</Link>|<Link to="/tasks">Tasks</Link>|
          <Link to="/profile">Profile</Link>
        </div>
        <Switch>
          <Route path="/tasks">
            <Tasks />
          </Route>
          <Route path="/profile">
            <div>Profile</div>
          </Route>
          <Route path="/">
            <div>Home</div>
          </Route>
        </Switch>
        <button onClick={logout}>Log out</button>
      </div>
    </Router>
  );
};

export default App;
