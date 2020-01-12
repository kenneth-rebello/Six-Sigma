import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { reportUser } from '../../actions/file.actions'

const ReportForm = ({supervisor, user, file, reportUser, closeReportForm}) => {

    const [formData, setFormData] = useState({
        message: "",
        supervisor: supervisor,
        user: user,
        file: file
    })

    useEffect(()=>{
        console.log(formData)
    },[formData])

    const Changer = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    const Submitter = e =>{
        e.preventDefault();
        reportUser(formData);
        closeReportForm();
    }

    const { email, message } = formData;

    return (
        <div className="row">
            <form onSubmit={e=>Submitter(e)}>
                <div className="form-input">
                    <input type="text" name="message" onChange={e => Changer(e)} value={message} required/>
                </div>
                <span>An email will be sent to {supervisor.displayName} on logging of your report</span>
                <input type="submit" className="btn" value="Submit"/>
            </form>
        </div>
    )
}

export default connect(null, { reportUser })(ReportForm);