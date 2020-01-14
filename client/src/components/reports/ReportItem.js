import React, { useState, Fragment } from 'react';
import './Reports.css';
import { connect } from 'react-redux';
import { overlay, content } from '../../utils/modalStyles';
import Modal from 'react-modal';
import Moment from 'react-moment';
import { deleteReport, recordReport } from '../../actions/file.actions';

const ReportItem = ({report, deleteReport, recordReport}) => {

    const [more, toggleMore] = useState(false)
    const [save, toggleSave] = useState(false)

    const [msg, setMsg] = useState("")

    const Submitter = e =>{
        e.preventDefault();
        const body = {
            summary: msg,
            id: report._id
        }
        recordReport(body);
        setMsg("")
        toggleSave(false)
    }

    return (
        <div className="report-item row">
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
                    <button className="btn" onClick={()=>toggleSave(true)}>
                        Save Report
                    </button>
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

            <Modal
                isOpen={save}
                onRequestClose={()=>toggleSave(false)}
                style={{
                    overlay: overlay,
                    content: content
                }}
                ariaHideApp={false}
            >
                <form onSubmit={e=>Submitter(e)}>
                    <input type="text" value={msg} onChange={(e)=>setMsg(e.target.value)} required/>
                    <input className="btn" type="submit" value="Submit"/>
                    <br/>
                    <span>By saving this report (permenantly) you are acknowledging that this report is 
                        legitimate and this will affect the concerned users credibility</span>
                </form>
            </Modal>
        </div>
    )
}
export default connect(null, { deleteReport, recordReport })(ReportItem);