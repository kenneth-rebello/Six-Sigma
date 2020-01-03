import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Home  from './components/home/Home';
import Navbar from './components/layouts/Navbar';
import Auth from './components/auth/Auth';
import Scanner from './components/qr/Scanner';
import Generator from './components/qr/Generator';

import {auth } from './firebase/firebase.utils';
import { setCurrentUser } from './actions/user.actions';
import setAuthHeader from './utils/setAuthHeader';


const App = ({currentUser, setCurrentUser}) => {

  if(currentUser){
    setAuthHeader(currentUser)
  }

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth){
        setCurrentUser(userAuth);
      }
    });

    return () => {
      unsubscribeFromAuth();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/auth" render={()=> currentUser ? (<Redirect to="/"/>):<Auth/>}/>
        <Route exact path="/scanner" component={Scanner}/>
        <Route exact path="/generator" component={Generator}/>
      </Switch>
    </Router>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser   
})

export default connect(mapStateToProps, {setCurrentUser})(App);