import React, { useState, Fragment } from 'react';
import './Reports.css';
import { overlay, content } from '../../utils/modalStyles';
import Modal from 'react-modal';
import Moment from 'react-moment';

const ReportItem = ({report}) => {

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
                            <button className="btn red">
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
export default ReportItem;