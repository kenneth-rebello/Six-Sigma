import React, { useEffect, useState } from 'react';
import './File.css';
import { connect } from 'react-redux';
import Stepper from '../stepper/Stepper';

import { getFileById } from '../../actions/file.actions';
import FileItem from '../files/FileItem';

const File = ({match, file, currentUser, getFileById}) => {

    const [steps, setSteps] = useState([]);
    const [activeStep, setActiveStep] = useState(-1);

    const [details, setDetails] = useState("")

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
            const btn = document.getElementById("detail-btn");
            btn.click();
        }
    }

 
    return (
        file && <div className="file-page">
            <FileItem file={file}/>
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
            <a id="detail-btn" className="waves-effect waves-light btn modal-trigger" href="#detail-modal" 
            style={{display:'none'}}>
                Click
            </a>
            <div id="detail-modal" className="modal">
                <div className="modal-content">
                    <h4 className="heading teal-text">Notes for {currentUser.displayName}</h4>
                    <p>{details}</p>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    file: state.file.file,
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps, {getFileById})(File);