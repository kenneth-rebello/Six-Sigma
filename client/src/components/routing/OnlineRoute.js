import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import ErrorBoundary from '../error-boundary/ErrorBoundary';
import PrivateRoute from './PrivateRoute';

const OnlineRoute = ({component: Component, user:{loading, online}, ...rest}) => {
    
    return (
        <Route {...rest} render = {props => !loading && !online ? (
            <ErrorBoundary/>
        ):(
            <PrivateRoute component={Component} {...props}/>
        )}/>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(OnlineRoute);