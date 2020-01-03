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
                            <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">
                                File
                            </a></li>
                            <li><a href="/scanner">Scanner</a></li>
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
                <li><a href="/generator">New File</a></li>
                <li><a href="/scanner">Scanner</a></li>
            </ul>
            <ul id="dropdown1" className="dropdown-content">
                <li><a href="/generator">New File</a></li>
                <li><a href="#!">two</a></li>
                <li class="divider"></li>
                <li><a href="#!">three</a></li>
            </ul>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(Navbar);