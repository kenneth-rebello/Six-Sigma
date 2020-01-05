import React, { useEffect, useState } from 'react';
import './File.css';
import { connect } from 'react-redux';
import Stepper from '../stepper/Stepper';

import { getFileById } from '../../actions/file.actions';
import FileItem from '../files/FileItem';

const File = ({match, file, getFileById}) => {

    const [steps, setSteps] = useState([]);
    const [activeStep, setActiveStep] = useState(0)

    useEffect(()=>{
        getFileById(match.params.id)
    },[])

    useEffect(()=>{
        file && createStepper();
    },[file]);

    let stepsTemp = [];
    const createStepper = () => {
        file.lineage.map(each => {
            stepsTemp.push({
                title: each.user.displayName,
                onClick: (e) => {
                    e.preventDefault()
                    getDetails(each)
                }
            })
            if(each.owner){
                setActiveStep(each.position);
            }
        });
        setSteps(stepsTemp)
    }

    const getDetails = obj => {
        console.log(obj)
    }

    const hoverFunc = () => {
        alert('Hover hua')
    }

    return (
        file && <div>
            <FileItem file={file}/>
            <div className="stepper">
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
        </div>
    )
}

const mapStateToProps = state => ({
    file: state.file.file
})

export default connect(mapStateToProps, {getFileById})(File);