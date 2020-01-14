import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, user:{loading, loggedIn}, ...rest}) => {
    
    return (
        <Route {...rest} render = {props => !loading && !loggedIn ? (
            <Redirect to="/"/>
        ):(
            <Component {...props}/>
        )}/>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);