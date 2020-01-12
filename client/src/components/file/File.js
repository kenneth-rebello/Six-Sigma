import React, { useEffect, useState, Fragment } from 'react';
import './File.css';
import { connect } from 'react-redux';
import Stepper from '../stepper/Stepper';
import Moment from 'react-moment';

import { getFileById, markFileDone } from '../../actions/file.actions';
import FileItem from '../files/FileItem';
import Modal from 'react-modal';
import { overlay, content } from '../../utils/modalStyles';
import { setFormDataAction } from '../../actions/util.actions';
import ReportForm from './ReportForm';
import Request from './Request';

const File = ({match, history, file, currentUser, getFileById, markFileDone, setFormDataAction}) => {

    const [steps, setSteps] = useState([]);
    const [activeStep, setActiveStep] = useState(-1);

    const [open, toggleOpen] = useState(false);
    const [details, setDetails] = useState({});

    const [list, toggleList] = useState(false);
    
    const [report, toggleReport] = useState(false);
    const [step, setStep] = useState({});
    
    const [owner, setOwner] = useState({});
    const [user, setUser] = useState({});

    useEffect(()=>{
        getFileById(match.params.id)
    },[])

    useEffect(()=>{
        setActiveStep(-1)
        file && createStepper();
    },[file]);

    let stepsTemp = [];
    const createStepper = () => {
        file.lineage.map((each, idx) => {
            if(each.user._id===currentUser._id) setUser(each)
            if(each.owner){
                setActiveStep(idx);
                setOwner(each)
            }
            stepsTemp.push({
                title: each.user.displayName,
                onClick: (e) => {
                    e.preventDefault()
                    getDetails(each)
                },
                onNameClick: (e)=>{
                    e.preventDefault()
                    history.push(`/user/${each.user._id}`)
                }
            })
        });
        setSteps(stepsTemp)
    }

    const getDetails = obj => {
        if(obj.user._id===currentUser._id){
            setDetails(obj);
            toggleOpen(true);
        }else if(obj.user._id!==currentUser._id && obj.done){
            setStep(obj);
            toggleReport(true)
        }
    }

    const markAsComplete = id => {
        markFileDone(id, history);
    }

    const editFilePath = () => {
        setFormDataAction(file.lineage);
        history.push(`/reassign/${match.params.id}`)
    }

    return (
        file && <div className="file-page">
            <FileItem file={file}/>
            {
                currentUser && file.owner && file.owner._id===currentUser._id && 
                <Fragment>
                    {!owner.done ? <button className="btn" onClick={()=>markAsComplete(file._id)}>
                        Mark as Complete
                    </button>
                    : <p>You have completed this task</p> }
                    
                    {user && user.deadline && !user.done && <Request supervisor={file.creator} old_date={user.deadline}
                        user={{
                            _id: currentUser._id,
                            displayName: currentUser.displayName
                        }} 
                        file={{
                            id:file._id, 
                            number:file.file_number
                        }}
                    />}

                    <p className="deadline">
                        Deadline:
                        <Moment format="DD/MM/YYYY">
                            {owner.deadline}
                        </Moment>
                    </p>
                </Fragment>
            }


            {
                file && file.creator._id===currentUser._id && 
                <Fragment>
                    {!file.concluded && <button className="btn" onClick={()=>editFilePath()}>
                        Edit File Path
                    </button>}
                    <button className="btn red" onClick={()=>toggleList(true)}>
                        Show Unauthorized Scans 
                    </button>
                </Fragment>
            }

            
            {file.description && <div className="description">
                <h5 className="heading teal-text">Description</h5>
                <p className="desc-text">{file.description}</p>
            </div>}

            <div className="stepper">
                <h5 className="heading teal-text">Progress</h5>
                <Stepper steps={steps}
                    activeStep ={activeStep}
                    circleFontSize={0}
                    activeColor="green"
                    defaultColor="darkgrey"
                    completeColor="teal"
                    completeBarColor="teal"
                    titleFontSize='1rem'
                />
            </div>
           
            <Modal
                isOpen={open}
                onRequestClose={()=>toggleOpen(false)}
                style={{
                    overlay: overlay,
                    content: {...content,
                        color: 'teal'
                    }
                }}
                ariaHideApp={false}
            >
                <h4 className="modal-title">Notes for {currentUser.displayName}</h4>
                <p className="details">{details.notes ? details.notes : "No notes"}</p>
                <span><Moment format="DD/MM/YYYY">
                    {details.deadline}
                </Moment></span>
            </Modal>

            <Modal 
                isOpen={list}
                onRequestClose={()=>toggleList(false)}
                style={{
                    overlay: overlay,
                    content: {...content,
                        color: 'teal'
                    }
                }}
                ariaHideApp={false}
            >
                <h5>Unauthorized Scans</h5>
                {file.illicit_scans.map(each => 
                    <div key={each._id}>
                        <span>{each.user.displayName}</span>{`  -  `}
                        <span><Moment format="DD/MM/YYYY HH:MM">
                            {each.scanned}
                        </Moment></span>
                    </div>
                )}
            </Modal>

            <Modal
                isOpen={report}
                onRequestClose={()=>toggleReport(false)}
                style={{
                    overlay: overlay,
                    content: {...content,
                        color: 'red'
                    }
                }}
                ariaHideApp={false}
            >
                {step && step.user && 
                <Fragment>
                    <h5>Report {step.user.displayName}</h5>
                    <ReportForm supervisor={file.creator} user={step.user} 
                        file={{
                            id:file._id, 
                            number:file.file_number,
                            owner: file.owner._id
                        }}
                        closeReportForm = {()=>toggleReport(false)}
                    />
                </Fragment>}
            </Modal>

        </div>
    )
}

const mapStateToProps = state => ({
    file: state.file.file,
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps, {getFileById, markFileDone, setFormDataAction})(File);