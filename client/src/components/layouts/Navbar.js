import React, { Fragment, useState } from 'react';
import './Navbar.css'
import { connect } from 'react-redux';

import SignOut from '../auth/SignOut';

const Navbar = ({currentUser}) => {

    const [hidden, toggleHidden] = useState(false);

    const guestLinks = (
        <Fragment>
            <li><a className="dropdown-trigger" href="#!" data-target="user-dropdown">
                User
            </a></li>
        </Fragment>
    )

    const authLinks = (
        <Fragment>
            <li><a className="dropdown-trigger" href="#!" data-target="file-dropdown">
                File
            </a></li>
            <li><a className="dropdown-trigger" href="#!" data-target="qr-dropdown">
                QR
            </a></li>
        </Fragment>
    )
    

    return (
        <Fragment>

            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">Six-Sigma</a>
                        <a data-target="mobile-demo" className="sidenav-trigger">Click</a>
                        <ul className="right hide-on-med-and-down">
                            {currentUser && currentUser.registered ? authLinks : guestLinks}
                            { !currentUser ? <li><a href="/auth">SignIn</a></li> 
                            : <li>
                                <a href="#" onClick={()=>toggleHidden(!hidden)}>
                                    {currentUser.displayName}
                                </a>
                            </li>}
                            { currentUser && <li>
                              <img onClick={()=>toggleHidden(!hidden)} 
                                className="nav-img" src={currentUser.picture} />  
                            </li>}
                        </ul>
                    </div>
                </nav>
            </div>
            {hidden && <SignOut closePopup={toggleHidden}/>}


            <ul className="sidenav" id="mobile-demo">
                <li><a href="/">Home</a></li>
                <li>
                    <ul className="collapsible">
                        <li>
                            <div className="collapsible-header">File</div>
                            <div className="collapsible-body">
                                <ul>
                                    <li><a href="/new_file">New File</a></li>
                                    <li><a href="/files">All Files</a></li>
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
                                    <li><a href="/register">Register</a></li>
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
            </ul>


            <ul id="file-dropdown" className="dropdown-content">
                <li><a href="/new_file">New File</a></li>
                <li><a href="/files">All Files</a></li>
            </ul>
            <ul id="user-dropdown" className="dropdown-content">
                <li><a href="/register">Register</a></li>
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

export default connect(mapStateToProps)(Navbar);