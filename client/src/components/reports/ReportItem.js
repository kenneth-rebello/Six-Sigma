import React, { useState, Fragment } from 'react';
import './Reports.css';
import { connect } from 'react-redux';
import { overlay, content } from '../../utils/modalStyles';
import Modal from 'react-modal';
import Moment from 'react-moment';
import { deleteReport } from '../../actions/file.actions';

const ReportItem = ({report, deleteReport}) => {

    const [more, toggleMore] = useState(false)

    return (
        <div className="report-item row">
            <div className="col s12">
                <div className="card whitesmoke">
                    <div className="card-content row">
                        
                        <div className="col s6 m3">
                            <span className="label">File Number: </span>
                            <span className="title">{report.file.file_number}</span>
                        </div>
                        <div className="col s6 m3">
                            <span className="label">Issued By: </span>
                            <span className="subtitle">{report.issuer.displayName}</span>
                        </div>
                        <div className="col s6 m3">
                            <span className="label">Issued Against: </span>
                            <span className="subtitle">{report.against.displayName}</span>
                        </div>
                        <div className="col s6 m3">
                            <button onClick={()=>toggleMore(true)} className="btn teal">
                                Show More
                            </button>
                            <button className="btn red" onClick={()=>deleteReport(report._id)}>
                                Dismiss Report
                            </button>
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
                    <h5>{report.title}</h5>
                    <p>{report.text}</p>
                    <span>
                        Reported On:
                        <Moment format="DD/MM/YYYY">
                            {report.reported_on}
                        </Moment>
                    </span>
                </Fragment>
            </Modal>
        </div>
    )
}
export default connect(null, { deleteReport })(ReportItem);