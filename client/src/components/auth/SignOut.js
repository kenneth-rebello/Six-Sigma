import React from 'react';
import './Auth.css';
import { connect } from 'react-redux';

import { unsetCurrentUser } from '../../actions/user.actions';

const SignOut = ({ unsetCurrentUser, closePopup }) => {

    const signOut = () => {
        closePopup(false);
        unsetCurrentUser();
    }

    return (
        <div className="sign-out-box">
            <button className="btn" onClick={()=>signOut()}>Sign Out</button>
        </div>
    )
}

export default connect(null, { unsetCurrentUser })(SignOut);