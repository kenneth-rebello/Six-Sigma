import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Home  from './components/home/Home';
import Navbar from './components/layouts/Navbar';
import Scanner from './components/qr/Scanner';
import Generator from './components/qr/Generator';
import NewFile from './components/file/NewFile';
import Register from './components/auth-form/Register';
import AllFiles from './components/files/AllFiles';
import File from './components/file/File';
import Suggestion from './components/layouts/Suggestion';
import AllUsers from './components/users/AllUsers';
import Reassign from './components/file/Reassign';


import {auth } from './firebase/firebase.utils';
import { setCurrentUser, checkIfOnline } from './actions/user.actions';
import setAuthHeader from './utils/setAuthHeader';

import ErrorBoundary from './components/error-boundary/ErrorBoundary';
import PrivateRoute from './components/routing/PrivateRoute';
import OnlineRoute from './components/routing/OnlineRoute';
import SupervisorRoute from './components/routing/SupervisorRoute';
import Reports from './components/reports/Reports';
import Requests from './components/requests/Requests';
import LanguageSelect from './components/layouts/LanguageSelect';
import LanguageChange from './components/layouts/LanguageChange';
import Stat from './components/stats/Stat';
import TaskForm from './components/task/TaskForm';


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
      <Switch>
        <div className="page">
          <ErrorBoundary>
            <Route exact path="/" component={Home}/>
            <PrivateRoute exact path="/register" component={Register}/>
            <PrivateRoute exact path="/language" component={LanguageChange}/>
            <PrivateRoute exact path="/scanner" component={Scanner}/>
            <PrivateRoute exact path="/generator" component={Generator}/>
            <PrivateRoute exact path="/new_file" component={NewFile}/>
            <PrivateRoute exact path="/files" component={AllFiles}/>
            <OnlineRoute exact path="/file/:id" component={File}/>
            <PrivateRoute exact path="/users" component={AllUsers}/>
            <SupervisorRoute exact path="/reassign/:id" component={Reassign}/>
            <SupervisorRoute exact path="/reports" component={Reports}/>
            <PrivateRoute exact path="/requests" component={Requests}/>
            <SupervisorRoute exact path="/stats" component={Stat}/>
            <SupervisorRoute exact path="/new_task" component={TaskForm}/>
          </ErrorBoundary>
        </div>
      </Switch>
      <Suggestion/>
      <LanguageSelect/>
    </Router>
  );
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
})

export default connect(mapStateToProps, {setCurrentUser, checkIfOnline})(App);