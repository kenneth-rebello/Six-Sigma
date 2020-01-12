import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Home from '../home/Home';
import PrivateRoute from './PrivateRoute';

const SupervisorRoute = ({component: Component, user:{loading, loggedIn, supervisor}, ...rest}) => {
    
    return (
        <Route {...rest} render = {props => !loading && !supervisor ? (
            <Home msg={"You are not authorized to view this page"} url={props.location.pathname}/>
        ):(
            <PrivateRoute component={Component} {...props}/>
        )}/>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(SupervisorRoute);