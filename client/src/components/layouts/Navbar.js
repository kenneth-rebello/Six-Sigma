import React, { Fragment, useState } from 'react';
import './Navbar.css'
import { connect } from 'react-redux';

import SignOut from '../auth/SignOut';
import Alert from './Alert';
import { unsetCurrentUser } from '../../actions/user.actions';
import { signInWithGoogle } from '../../firebase/firebase.utils';

const Navbar = ({currentUser, unsetCurrentUser}) => {

    const [hidden, toggleHidden] = useState(false)

    return (
        <Fragment>

            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">Six-Sigma</a>
                        <a data-target="mobile-demo" className="sidenav-trigger">Click</a>
                        <ul className="right hide-on-med-and-down">
                            <li><a className="dropdown-trigger" href="#!" data-target="file-dropdown">
                                File
                            </a></li>
                            <li><a className="dropdown-trigger" href="#!" data-target="qr-dropdown">
                                QR
                            </a></li>
                            <li><a className="dropdown-trigger" href="#!" data-target="user-dropdown">
                                User
                            </a></li>
                            { !currentUser ? <li><a href="#" onClick={signInWithGoogle}>SignIn</a></li> 
                            : <li>
                                <a href="#" onClick={()=>toggleHidden(!hidden)}>
                                    {currentUser.displayName}
                                </a>
                            </li>}
                            { currentUser && currentUser.picture && <li>
                              <img onClick={()=>toggleHidden(!hidden)} 
                                className="nav-img" src={currentUser.picture} />  
                            </li>}
                        </ul>
                    </div>
                    <Alert/>
                </nav>
            </div>
            {hidden && <SignOut closePopup={toggleHidden}/>}


            <ul className="sidenav" id="mobile-demo">
                { currentUser && <li className="username">
                    { currentUser.displayName }
                </li> }
                <li><a href="/">Home</a></li>
                <li>
                    <ul className="collapsible">
                        <li>
                            <div className="collapsible-header">File</div>
                            <div className="collapsible-body">
                                <ul>
                                    <li><a href="/new_file">New File</a></li>
                                    <li><a href="/files">All Files</a></li>
                                    <li><a href="/reports">Reports</a></li>
                                    <li><a href="/requests">Requests</a></li>
                                </ul>
                            </div>
                        </li> 
                    </ul>
                </li>
                <li>
                    <ul className="collapsible">
                        <li>
                            <div className="collapsible-header">QR</div>
                            <div className="collapsible-body">
                                <ul>
                                    <li><a href="/generator">New QRCode</a></li>
                                    <li><a href="/scanner">QR Scanner</a></li>
                                </ul>
                            </div>
                        </li> 
                    </ul>
                </li>
                <li>
                    <ul className="collapsible">
                        <li>
                            <div className="collapsible-header">User</div>
                            <div className="collapsible-body">
                                <ul>
                                    <li><a href="/users">All Users</a></li>
                                    <li><a href="/register">
                                        {currentUser && currentUser.registered ? "Edit Profile" : "Register"}
                                    </a></li>
                                    {currentUser ? <button className="sign-out-link" onClick={()=>unsetCurrentUser()}>
                                        Sign Out
                                    </button>: <button onClick={signInWithGoogle}>
                                        Sign In
                                    </button>}
                                </ul>
                            </div>
                        </li> 
                    </ul>
                </li>
            </ul>


            <ul id="file-dropdown" className="dropdown-content">
                <li><a href="/new_file">New File</a></li>
                <li><a href="/files">All Files</a></li>
                <li><a href="/reports">Reports</a></li>
                <li><a href="/requests">Requests</a></li>
            </ul>
            <ul id="user-dropdown" className="dropdown-content">
                <li><a href="/users">All Users</a></li>
                <li><a href="/register">
                    {currentUser && currentUser.registered ? "Edit Profile" : "Register"}
                </a></li>
            </ul>
            <ul id="qr-dropdown" className="dropdown-content">
                <li><a href="/generator">New QRCode</a></li>
                <li><a href="/scanner">QR Scanner</a></li>
            </ul>

        </Fragment>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps, {unsetCurrentUser})(Navbar);