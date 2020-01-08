import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import Home  from './components/home/Home';
import Navbar from './components/layouts/Navbar';
import Auth from './components/auth/Auth';
import Scanner from './components/qr/Scanner';
import Generator from './components/qr/Generator';
import NewFile from './components/file/NewFile';
import Register from './components/auth-form/Register';
import AllFiles from './components/files/AllFiles';
import File from './components/file/File';
import Suggestion from './components/layouts/Suggestion';


import {auth } from './firebase/firebase.utils';
import { setCurrentUser, checkIfOnline } from './actions/user.actions';
import setAuthHeader from './utils/setAuthHeader';
import PrivateRoute from './components/routing/PrivateRoute';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import OnlineRoute from './components/routing/OnlineRoute';
import Alert from './components/layouts/Alert';


const App = (props) => {

  const {currentUser, setCurrentUser, checkIfOnline} = props;

  if(localStorage.token){
    setAuthHeader(localStorage.token)
  }

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if(userAuth){
        setCurrentUser(userAuth);
      }
    });

    checkIfOnline(window.navigator.onLine);

    return () => {
      unsubscribeFromAuth();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <Router>
      <Navbar/>
      <Alert/>
      <Switch>
        <div className="page">
          <ErrorBoundary>
            <Route exact path="/" component={Home}/>
            <Route path="/auth" render={()=> currentUser ? (<Redirect to="/"/>):<Auth/>}/>
            <PrivateRoute exact path="/register" component={Register}/>
            <PrivateRoute exact path="/scanner" component={Scanner}/>
            <PrivateRoute exact path="/generator" component={Generator}/>
            <PrivateRoute exact path="/new_file" component={NewFile}/>
            <PrivateRoute exact path="/files" component={AllFiles}/>
            <OnlineRoute exact path="/file/:id" component={File}/>
          </ErrorBoundary>
        </div>
      </Switch>
      <Suggestion/>
    </Router>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps, {setCurrentUser, checkIfOnline})(App);