import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Home from '../home/Home';

const PrivateRoute = ({component: Component, user:{loading, loggedIn}, ...rest}) => {
    
    return (
        <Route {...rest} render = {props => !loading && !loggedIn ? (
            <Home msg={"You must be logged in to visit this page"} url={props.location.pathname}/>
        ):(
            <Component {...props}/>
        )}/>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);