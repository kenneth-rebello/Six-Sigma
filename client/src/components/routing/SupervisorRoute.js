import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

const SupervisorRoute = ({component: Component, user:{loading, supervisor}, ...rest}) => {
    
    return (
        <Route {...rest} render = {props => !loading && !supervisor ? (
            <Redirect to="/"/>
        ):(
            <PrivateRoute component={Component} {...props}/>
        )}/>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(SupervisorRoute);