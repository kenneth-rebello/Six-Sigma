import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Home from '../home/Home';

const SupervisorRoute = ({component: Component, user:{loading, loggedIn, supervisor}, ...rest}) => {
    
    return (
        <Route {...rest} render = {props => !loading && !loggedIn && !supervisor ? (
            <Home msg={"You are not authorized to view this page"} url={props.location.pathname}/>
        ):(
            <Component {...props}/>
        )}/>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(SupervisorRoute);