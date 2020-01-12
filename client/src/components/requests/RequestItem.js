import React, { useState, Fragment } from 'react';
import './Requests.css';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { deleteRequest } from '../../actions/util.actions';
import { overlay, content } from '../../utils/modalStyles';
import Modal from 'react-modal';

const RequestItem = ({request, supervisor, deleteRequest}) => {

    const [more, toggleMore] = useState(false)

    return (
        <Fragment>
            <div className="request-item row">
                <div className="col s12">
                    <div className="card whitesmoke">
                        <div className="card-content row">
                            
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
                                {supervisor && <button className="btn red" onClick={()=>deleteRequest(request._id)}>
                                    Dismiss
                                </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
    supervisor: state.user.supervisor
})

export default connect(mapStateToProps, {deleteRequest})(RequestItem);