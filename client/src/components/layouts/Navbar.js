import React, { Fragment, useState } from 'react';
import './Navbar.css'
import { connect } from 'react-redux';

import SignOut from '../auth/SignOut';

const Navbar = ({currentUser}) => {

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
                            <li><a className="dropdown-trigger" href="#!" data-target="user-dropdown">
                                User
                            </a></li>
                            { !currentUser ? <li><a href="/auth">SignIn</a></li> 
                            : <li>
                                <a href="#">{currentUser.displayName}</a>
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
                            <div class="collapsible-header">File</div>
                            <div class="collapsible-body">
                                <li><a href="/generator">New QRCode</a></li>
                                <li><a href="/new_file">New File</a></li>
                                <li><a href="/scanner">QR Scanner</a></li>
                            </div>
                        </li> 
                    </ul>
                </li>
                <li>
                    <ul className="collapsible">
                        <li>
                            <div class="collapsible-header">User</div>
                            <div class="collapsible-body">
                                <li><a href="/register">Register</a></li>
                            </div>
                        </li> 
                    </ul>
                </li>
            </ul>


            <ul id="file-dropdown" className="dropdown-content">
                <li><a href="/generator">New QRCode</a></li>
                <li><a href="/new_file">New File</a></li>
                <li><a href="/scanner">Scanner</a></li>
            </ul>
            <ul id="user-dropdown" className="dropdown-content">
                <li><a href="/register">Register</a></li>
            </ul>

        </Fragment>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Navbar);