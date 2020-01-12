import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { content, overlay } from '../../utils/modalStyles';
import { submitRequest } from '../../actions/util.actions';

const Request = ({old_date, user, supervisor, file, submitRequest}) => {

    const [open, toggleOpen] = useState(false);

    const [formData, setFormData] = useState({
        message:"",
        new_date: "",
        old_date: old_date,
        supervisor: supervisor,
        file: file,
        user: user
    });

    const Changer = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
        console.log(formData)
    }

    const Submitter = e => {
        e.preventDefault();
        submitRequest(formData);
        toggleOpen(false)
        setFormData({
            ...formData,
            message:"",
            new_date: ""
        })
    }

    const { new_date, message } = formData;

    return (
        <Fragment>
            <button className="btn" onClick={()=>toggleOpen(true)}>
                Request Deadline Extension
            </button>

            <Modal
                isOpen={open}
                onRequestClose={()=>toggleOpen(false)}
                style={{
                    overlay: overlay,
                    content: content
                }}
                ariaHideApp={false}
            >
                <h4>Request for deadline extension</h4>
                <span>An email will be sent to {supervisor.displayName} on succesful submission</span>
                <form onSubmit={e=>Submitter(e)}>
                    <input type="text" name="message" value={message} onChange={e=>Changer(e)} placeholder="Message" required/>
                    <label>Enter a message explaiing your reason for this request</label>

                    <input type="date" name="new_date" value={new_date} onChange={e=>Changer(e)} required/>
                    <label>Suggest a new deadline</label>
                    <input type="submit" value="Submit" className="btn green"/>
                </form>
            </Modal>
        </Fragment>
    )
}

export default connect(null, {submitRequest})(Request);