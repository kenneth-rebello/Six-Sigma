import React, { useEffect, useState, Fragment } from 'react';
import './File.css';
import { connect } from 'react-redux';
import Stepper from '../stepper/Stepper';

import { getFileById, markFileDone } from '../../actions/file.actions';
import FileItem from '../files/FileItem';
import Modal from 'react-modal';
import { overlay, content } from '../../utils/modalStyles';
import { setFormDataAction } from '../../actions/util.actions';

const File = ({match, history, file, currentUser, getFileById, markFileDone, setFormDataAction}) => {

    const [steps, setSteps] = useState([]);
    const [activeStep, setActiveStep] = useState(-1);
    const [open, toggleOpen] = useState(false);
    const [list, toggleList] = useState(false);
    const [details, setDetails] = useState("");
    const [owner, setOwner] = useState({});

    useEffect(()=>{
        getFileById(match.params.id)
    },[])

    useEffect(()=>{
        setActiveStep(-1)
        file && createStepper();
    },[file]);

    let stepsTemp = [];
    const createStepper = () => {
        file.lineage.map(each => {
            if(each.owner){
                setActiveStep(each.position);
                setOwner(each)
            }
            stepsTemp.push({
                title: each.user.displayName,
                onClick: (e) => {
                    e.preventDefault()
                    getDetails(each)
                }
            })
        });
        setSteps(stepsTemp)
    }

    const getDetails = obj => {
        if(obj.user._id===currentUser._id && obj.notes){
            setDetails(obj.notes);
            toggleOpen(true)
        }
    }

    const markAsComplete = async id => {
        const fileID = await markFileDone(id);
        history.push(`/file/${fileID}`);
    }

    const editFilePath = () => {
        setFormDataAction(file.lineage);
        history.push(`/reassign/${match.params.id}`)
    }


    return (
        file && <div className="file-page">
            <FileItem file={file}/>
            {
                currentUser && file.owner && file.owner._id===currentUser._id ? !owner.done ?
                <button className="btn" onClick={()=>markAsComplete(file._id)}>Mark as Complete</button>
                : <p>You have completed this task</p> : <p></p>
            }
            {file.description && <div className="description">
                <h5 className="heading teal-text">Description</h5>
                <p className="desc-text">{file.description}</p>
            </div>}
            <div className="stepper">
                <h5 className="heading teal-text">Progress</h5>
                {file && file.creator._id===currentUser._id && 
                <Fragment>
                    <button className="btn" onClick={()=>editFilePath()}>
                        Edit File Path
                    </button>
                    <button className="btn red" onClick={()=>toggleList(true)}>
                        Show Unauthorized Scans 
                    </button>
                </Fragment>}
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
            >
                <h4 className="modal-title">Notes for {currentUser.displayName}</h4>
                <p className="details">{details}</p>
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
            >
                <h5>Unauthorized Scans</h5>
                {file.illicit_scans.map(each => 
                    <p key={each._id}>{each.user.displayName}</p>
                )}
            </Modal>
        </div>
    )
}

const mapStateToProps = state => ({
    file: state.file.file,
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps, {getFileById, markFileDone, setFormDataAction})(File);