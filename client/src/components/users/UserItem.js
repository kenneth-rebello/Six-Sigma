import React from 'react';
import './Users.css'

const UserItem = ({user}) => {
    return (
        <div className="user-item row">
            <div className="col s12">
                <div className="card whitesmoke">
                    <div className="card-content row">              
                        <div className="col s4 m2">
                            <img className="picture" src={user.picture}/>
                        </div>
                        <div className="col s8 m10">
                            <div className="row">
                                <div className="col s12 m4">
                                    <span className="label">Username: </span>
                                    <span className="title">{user.displayName}</span>
                                </div>
                                <div className="col s6 m4">
                                    <span className="label">Position: </span>
                                    <span className="subtitle">{user.designation}</span>        
                                </div>
                                <div className="col s6 m4">
                                    <span className="label">Department: </span>
                                    <span className="subtitle">{user.department.name}</span>        
                                </div>
                            </div>                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserItem;