import React, { useState, Fragment } from 'react';
import './Requests.css';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { deleteRequest, grantRequest } from '../../actions/util.actions';
import { overlay, content } from '../../utils/modalStyles';
import Modal from 'react-modal';

const RequestItem = ({currentUser, request, supervisor, deleteRequest, grantRequest}) => {

    const [more, toggleMore] = useState(false)
    const [dismiss, toggleDismiss] = useState(false)

    return (
        <Fragment>
            <div className="request-item row">       
                <div className="col s6 m3">
                    <span className="label">File Number: </span>
                    <span className="title">{request.file.file_number}</span>
                </div>
                <div className="col s6 m3">
                    <span className="label">User: </span>
                    <span className="subtitle">{request.user.displayName}</span>
                </div>
                <div className="col s6 m3">
                    <span className="label">Old Deadline: </span>
                    <span className="subtitle">
                        <Moment format="DD/MM/YYYY">
                            {request.old_deadline}
                        </Moment>
                    </span>
                    <span className="label">New Deadline Suggested: </span>
                    <span className="subtitle">
                        <Moment format="DD/MM/YYYY">
                            {request.new_deadline}
                        </Moment>
                    </span>
                </div>
                <div className="col s6 m3">
                    <button className="btn" onClick={()=>toggleMore(true)}>
                        Show More
                    </button>
                    <Link className="btn green" to={`/file/${request.file._id}`} >
                        Go To File
                    </Link>
                    {request.user._id===currentUser._id && <Fragment>
                        <button className="btn red" onClick={()=>deleteRequest(request._id)}>
                            Remove
                        </button>
                        <span>
                            Status: {request.accepted ? "Accepted" : "Awaiting"}    
                        </span>
                    </Fragment> }
                    {supervisor && <button className="btn red" onClick={()=>toggleDismiss(true)}>
                        Dismiss
                    </button>}
                </div>
            </div>

            <Modal 
                isOpen={dismiss}
                onRequestClose={()=>toggleDismiss(false)}
                style={{
                    overlay: overlay,
                    content: content
                }}
                ariaHideApp={false}
            >
                <button className="btn red" onClick={()=>deleteRequest(request._id)}>
                    Delete without accepting
                </button>
                <button className="btn green" onClick={()=>grantRequest(request._id)}>
                    Grant and delete
                </button>
                <span>Make sure you have edited the deadline for this request before granting it</span>
            </Modal>

            <Modal 
                isOpen={more}
                onRequestClose={()=>toggleMore(false)}
                style={{
                    overlay: overlay,
                    content: content
                }}
                ariaHideApp={false}
            >
                <Fragment>
                    <h5>{request.title}</h5>
                    <p>{request.text}</p>
                    <span>
                        Request Submitted On:
                        <Moment format="DD/MM/YYYY">
                            {request.reported_on}
                        </Moment>
                    </span>
                </Fragment>
            </Modal>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    supervisor: state.user.supervisor,
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps, {deleteRequest, grantRequest})(RequestItem);