import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home  from './components/home/Home';
import Navbar from './components/layouts/Navbar';
import Scanner from './components/qr/Scanner';
import Generator from './components/qr/Generator';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/scanner" component={Scanner}/>
        <Route exact path="/generator" component={Generator}/>
      </Switch>
    </Router>
  );
}

export default App;
