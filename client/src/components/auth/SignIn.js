import React, { useState } from 'react';
import './Auth.css'

import FormInput from '../utils/form-input/FormInput';
import Button from '../utils/button/Button';

import {auth, signInWithGoogle} from '../../firebase/firebase.utils';

const SignIn = () => {

    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const handleSubmit = async(e) => {

        const {email, password} = user;
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            setUser({...user, [e.target.name]:e.target.value})
        } catch (err) {
            console.log(err);   
        }
    }

    const handleChange = e => {
        const {value, name} = e.target;

        setUser({...user, [name]:value})
    }

    return (
        <div className="sign-in">
            <div className="title">I already have an account</div>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput type="email" 
                    name="email" 
                    value={user.email} required 
                    handleChange={handleChange} 
                    label="Email"/>
                <FormInput 
                    type="password" 
                    name="password" 
                    value={user.password} required 
                    handleChange={handleChange} 
                    label="Password"/>
                <div className="button-box">
                    <Button type="submit">Sign In</Button>
                    <Button onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</Button>
                </div>
            </form>
        </div>
    )
    
}

export default SignIn