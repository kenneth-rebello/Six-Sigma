import React, { useEffect, useState } from 'react';
import './File.css';
import { connect } from 'react-redux';
import Stepper from '../stepper/Stepper';

import { getFileById, markFileDone } from '../../actions/file.actions';
import FileItem from '../files/FileItem';
import Modal from 'react-modal';
import { overlay, content } from '../../utils/modalStyles';

const File = ({match, history, file, currentUser, getFileById, markFileDone}) => {

    const [steps, setSteps] = useState([]);
    const [activeStep, setActiveStep] = useState(-1);
    const [open, toggleOpen] = useState(false);
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


    return (
        file && <div className="file-page">
            <FileItem file={file}/>
            {
                currentUser && file.owner && file.owner._id===currentUser._id && !owner.done ?
                <button className="btn" onClick={()=>markAsComplete(file._id)}>Mark as Complete</button>
                : <p>You have completed this task</p>
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
            >
                <h4 className="modal-title">Notes for {currentUser.displayName}</h4>
                <p className="details">{details}</p>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => ({
    file: state.file.file,
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps, {getFileById, markFileDone})(File);