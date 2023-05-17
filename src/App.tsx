import React from 'react';
import { routes } from './constants/routes';
import Home from './screens/Home';
import CanvasClass from './screens/CanvasClass';
import {
  Router,
  Switch,
  Route,
} from "wouter";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path={routes.HOME}>
          <CanvasClass />
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
