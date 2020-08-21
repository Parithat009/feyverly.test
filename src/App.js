import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import PrivateRoute from './route/PrivateRoute'
import { Login, Detail } from './pages'

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={Detail} />
        <Route path='/login' component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
