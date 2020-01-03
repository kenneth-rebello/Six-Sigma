import React from 'react'
import SignIn from './SignIn';
import SignUp from './SignUp';

import './Auth.css'

const Auth = () => {
    return (
        <div className="auth">
            <SignIn/>
            <SignUp/>
        </div>
    )
}


export default Auth 