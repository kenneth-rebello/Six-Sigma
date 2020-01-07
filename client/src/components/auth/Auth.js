import React, { useEffect } from 'react'
import SignIn from './SignIn';
import SignUp from './SignUp';

import './Auth.css'

const Auth = (props) => {

    useEffect(()=>{
        if(props.msg){
            alert(`${props.msg} - ${props.url} is a secured page`)
        }
    },[])

    return (
        <div className="auth">
            <SignIn/>
            <SignUp/>
        </div>
    )
}


export default Auth 