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
import { dict } from '../../utils/language';

const File = ({match, history, file, currentUser, supervisor, language,
    getFileById, markFileDone, setFormDataAction}) => {

    const [steps, setSteps] = useState([]);
    const [activeStep, setActiveStep] = useState(-1);
    const [activeColor, setActiveColor] = useState("green")

    const [open, toggleOpen] = useState(false);

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
                each.done ? setActiveColor("green") : setActiveColor("#ff7e00")
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
        if(obj.user._id===currentUser._id || supervisor){
            setStep(obj);
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
                currentUser && owner.user && owner.user._id===currentUser._id && 
                <Fragment>
                    {!owner.done && owner._id!==file.creator._id ? <button className="btn" onClick={()=>markAsComplete(file._id)}>
                        {dict["Mark as Complete"][language]}
                    </button>
                    : <p>{dict["You have completed this task"][language]}</p> }
                    
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
                        {dict["Deadline"][language]}:
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
                        {dict["Edit File Path"][language]}
                    </button>}
                    <button className="btn red" onClick={()=>toggleList(true)}>
                        {dict["Show Unauthorized Scans"][language]} 
                    </button>
                </Fragment>
            }

            
            {file.description && <div className="description">
                <h5 className="heading teal-text">
                    {dict["Description"][language]}
                </h5>
                <p className="desc-text">{file.description}</p>
            </div>}

            <div className="stepper">
                <h5 className="heading teal-text">
                    {dict["Progress"][language]}
                </h5>
                <Stepper steps={steps}
                    activeStep ={activeStep}
                    circleFontSize={0}
                    activeColor={activeColor}
                    defaultColor="darkgrey"
                    completeColor="teal"
                    completeBarColor="teal"
                    titleFontSize={15}
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
                {step.user && <h4 className="modal-title">
                    {dict["Notes for"][language]} {step.user.displayName}
                </h4>}
                <p className="details">{step.notes ? step.notes : "No notes"}</p>
                <span><Moment format="DD/MM/YYYY">
                    {step.deadline}
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
                <h5>{dict["Unauthorized Scans"][language]}</h5>
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
    currentUser: state.user.currentUser,
    supervisor: state.user.supervisor,
    language: state.user.language
})

export default connect(mapStateToProps, {getFileById, markFileDone, setFormDataAction})(File);