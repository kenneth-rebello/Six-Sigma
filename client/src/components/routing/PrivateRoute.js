import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Auth from '../auth/Auth';

const PrivateRoute = ({component: Component, user:{loading, loggedIn}, ...rest}) => {
    
    return (
        <Route {...rest} render = {props => !loading && !loggedIn ? (
            <Auth/>
        ):(
            <Component {...props}/>
        )}/>
    )
}

const mapStateToProps = state => ({
    user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);